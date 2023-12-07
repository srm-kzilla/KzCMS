import db from '@/loaders/database';
import { MESSAGES_TEXT, SALT_ROUNDS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { ToggleProjectType, Token, UpdateProjectSchemaType } from '@/shared/types';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AnyBulkWriteOperation, Document } from 'mongodb';

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message.error };
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await (await db()).collection('users').updateOne({ email }, { $set: { password: hash } });
};

export async function handleDeleteUser(email: string) {
  const user = await (await db()).collection('users').findOne({ email });
  if (!user) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message.error };
  }
  if (user.isDeleted) {
    throw { statusCode: ERRORS.USER_ALREADY_DELETED.code, message: ERRORS.USER_ALREADY_DELETED.message.error };
  }
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true, isVerified: false } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const result = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
    };
  }
};

export async function handleUpdateUserProjects(data: UpdateProjectSchemaType) {
  const project = await (await db()).collection('projects').findOne({ projectSlug: data.projectSlug });

  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const newUsers = data.userAccess.filter(email => !project.userAccess.includes(email));
  const deletedUsers = project.userAccess.filter(email => !newUsers.includes(email));

  const projects_collection = (await db()).collection('projects');
  const users_collection = (await db()).collection('users');

  const bulkWriteOperations: AnyBulkWriteOperation<Document>[] = [];

  if (newUsers.length > 0) {
    bulkWriteOperations.push({
      updateMany: {
        filter: { email: { $in: newUsers } },
        update: { $push: { projects: project.projectSlug } },
      },
    });
  }

  if (deletedUsers.length > 0) {
    bulkWriteOperations.push({
      updateMany: {
        filter: { email: { $in: deletedUsers } },
        update: { $pull: { projects: project.projectSlug } },
      },
    });
  }

  if (bulkWriteOperations.length > 0) {
    await users_collection.bulkWrite(bulkWriteOperations);
  }

  await projects_collection.updateOne({ projectSlug: data.projectSlug }, { $set: { userAccess: data.userAccess } });
}

export async function handleToggleProject(slug: string, status: Required<Omit<ToggleProjectType, 'slug'>>) {
  const { isEnabled, isDevelopment } = status;

  const project = await (await db())
    .collection('projects')
    .findOne({ projectSlug: slug }, { projection: { isEnabled: 1, isDevelopment: 1 } });

  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  if (isEnabled === project.isEnabled && isDevelopment === project.isDevelopment) {
    throw {
      statusCode: ERRORS.INVARIANT_PROJECT_STATUS.code,
      message: ERRORS.INVARIANT_PROJECT_STATUS.message.error,
    };
  }

  await (await db()).collection('projects').updateOne({ projectSlug: slug }, { $set: { isEnabled, isDevelopment } });
}

export async function handleUpdateDomains(slug: string, allowedDomains: string[]): Promise<void> {
  const project = await (await db())
    .collection('projects')
    .findOne({ projectSlug: slug }, { projection: { allowedDomains: 1 } });

  if (!project) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const sortedOriginal = project.allowedDomains.sort().join();
  const sortedNew = allowedDomains.sort().join();

  if (sortedOriginal === sortedNew) {
    throw { statusCode: ERRORS.RESOURCE_CONFLICT.code, message: ERRORS.RESOURCE_CONFLICT.message.error };
  }

  await (await db()).collection('projects').updateOne({ projectSlug: slug }, { $set: { allowedDomains } });
}

export async function handleGetTokens(projectId: string): Promise<{ tokens: string[] }> {
  const result = (await (await db()).collection('tokens').findOne(
    { projectId },
    {
      projection: { 'tokens.name': 1, _id: 0 },
    },
  )) as unknown as { tokens: Token[] };

  if (!result) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message.error };
  }

  const tokens = result.tokens.map(token => token.name);

  return { tokens: tokens };
}

export async function handleCreateToken(projectId: string, tokenName: string): Promise<{ token: string }> {
  const tokens = (await (await db())
    .collection('tokens')
    .findOne({ projectId }, { projection: { 'tokens.name': 1 } })) as unknown as {
    tokens: Omit<Token, 'token'>[];
  };

  if (tokens?.tokens.some(token => token.name === tokenName)) {
    throw { statusCode: ERRORS.RESOURCE_CONFLICT.code, message: MESSAGES_TEXT.TOKEN_WITH_SAME_NAME_EXISTS };
  }

  const token = crypto.randomBytes(16).toString('hex');

  const result = await (await db()).collection('tokens').updateOne(
    { projectId },
    {
      $push: { tokens: { name: tokenName, token } },
    },
    {
      upsert: true,
    },
  );

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
    };
  }

  return { token: token };
}

export async function handleDeleteToken(projectId: string, tokenName: string): Promise<void> {
  const result = await (await db()).collection('tokens').updateOne(
    { projectId },
    {
      $pull: { tokens: { name: tokenName } },
    },
  );

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.NOT_FOUND.code,
      message: MESSAGES_TEXT.TOKEN_NOT_FOUND,
    };
  }
}
