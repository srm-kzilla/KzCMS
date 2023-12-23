import db from '@/loaders/database';
import { MESSAGES_TEXT, SALT_ROUNDS } from '@/shared/constants';
import { ERRORS } from '@/shared/errors';
import { ProjectType, Token, UpdateProjectSchemaType } from '@/shared/types';
import { sha256 } from '@/shared/utils/hash';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AnyBulkWriteOperation, Document, ObjectId } from 'mongodb';

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.code,
      message: ERRORS.USER_NOT_FOUND.message.error,
      description: ERRORS.USER_NOT_FOUND.message.error_description,
    };
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await (await db()).collection('users').updateOne({ email }, { $set: { password: hash } });
};

export async function handleDeleteUser(email: string) {
  const user = await (await db()).collection('users').findOne({ email });
  if (!user) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND.code,
      message: ERRORS.USER_NOT_FOUND.message.error,
      description: ERRORS.USER_NOT_FOUND.message.error_description,
    };
  }
  if (user.isDeleted) {
    throw {
      statusCode: ERRORS.USER_ALREADY_DELETED.code,
      message: ERRORS.USER_ALREADY_DELETED.message.error,
      description: ERRORS.USER_ALREADY_DELETED.message.error_description,
    };
  }
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true, isVerified: false } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const result = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.FAILED_USER_VALIDATION.code,
      message: ERRORS.FAILED_USER_VALIDATION.message.error,
      description: ERRORS.FAILED_USER_VALIDATION.message.error_description,
    };
  }
};

export async function handleUpdateUserProjects(data: UpdateProjectSchemaType) {
  const project = await (await db()).collection('projects').findOne({ projectSlug: data.projectSlug });

  if (!project) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      description: ERRORS.RESOURCE_NOT_FOUND.message.error_description,
    };
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

export async function handleUpdateDomains(slug: string, allowedDomains: string[]): Promise<void> {
  const project = await (await db())
    .collection('projects')
    .findOne({ projectSlug: slug }, { projection: { allowedDomains: 1 } });

  if (!project) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: ERRORS.RESOURCE_NOT_FOUND.message.error,
      description: ERRORS.RESOURCE_NOT_FOUND.message.error_description,
    };
  }

  const sortedOriginal = project.allowedDomains.sort().join();
  const sortedNew = allowedDomains.sort().join();

  if (sortedOriginal === sortedNew) {
    throw {
      statusCode: ERRORS.RESOURCE_CONFLICT.code,
      message: ERRORS.RESOURCE_CONFLICT.message.error,
      description: ERRORS.RESOURCE_CONFLICT.message.error_description,
    };
  }

  await (await db()).collection('projects').updateOne({ projectSlug: slug }, { $set: { allowedDomains } });
}

export async function handleGetTokens(projectId: string) {
  const tokensCollection = (await db()).collection<Token>('tokens');
  const tokens = await tokensCollection
    .find(
      { projectId, isDeleted: false },
      {
        projection: {
          name: 1,
          createdAt: 1,
          createdBy: 1,
        },
      },
    )
    .toArray();

  return { tokens };
}

export async function handleCreateToken(
  projectId: string,
  tokenName: string,
  userEmail: string,
): Promise<{ token: string }> {
  const projectsCollection = (await db()).collection<ProjectType>('projects');

  const project = await projectsCollection.findOne({ _id: new ObjectId(projectId) }, { projection: { _id: 1 } });

  if (!project) {
    throw {
      statusCode: ERRORS.PROJECT_NOT_FOUND.code,
      message: ERRORS.PROJECT_NOT_FOUND.message.error,
      description: ERRORS.PROJECT_NOT_FOUND.message.error_description,
    };
  }

  const tokensCollection = (await db()).collection<Token>('tokens');
  const tokens = await tokensCollection
    .find(
      { projectId, isDeleted: false },
      {
        projection: {
          name: 1,
        },
      },
    )
    .toArray();

  if (tokens.some(token => token.name === tokenName)) {
    throw {
      statusCode: ERRORS.RESOURCE_CONFLICT.code,
      message: MESSAGES_TEXT.TOKEN_WITH_SAME_NAME_EXISTS,
      description: MESSAGES_TEXT.TOKEN_WITH_SAME_NAME_EXISTS,
    };
  }

  const token = crypto.randomBytes(16).toString('hex');

  const result = await tokensCollection.insertOne({
    projectId,
    name: tokenName,
    token: sha256.hash(token),
    isDeleted: false,
    createdAt: new Date().toISOString(),
    createdBy: userEmail,
    lastUpdatedBy: userEmail,
  });

  if (!result.acknowledged) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
      description: ERRORS.DATA_OPERATION_FAILURE.message.error_description,
    };
  }

  return { token: token };
}

export async function handleDeleteToken(projectId: string, tokenName: string, userEmail: string): Promise<void> {
  const tokensCollection = (await db()).collection<Token>('tokens');
  const result = await tokensCollection.updateOne(
    { projectId, name: tokenName },
    { $set: { isDeleted: true, lastUpdatedBy: userEmail } },
  );

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: ERRORS.DATA_OPERATION_FAILURE.code,
      message: ERRORS.DATA_OPERATION_FAILURE.message.error,
      description: ERRORS.DATA_OPERATION_FAILURE.message.error_description,
    };
  }
}
