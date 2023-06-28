import db from '@/loaders/database';
import bcrypt from 'bcrypt';
import { ERRORS } from '@/shared/errors';
import { Collection, WithId, ObjectId } from 'mongodb';
import { UpdateProjectSchemaType } from '@/shared/types/admin/admin.schema';


interface User {
  name: string;
  age: number;
}

export const handleGetUsers = async (): Promise<WithId<Document>[]> => {
  const collection: Collection<Document> = (await db()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export const handleUpdateUser = async (email: string, password: string): Promise<void> => {
  const data = await (await db()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: ERRORS.USER_NOT_FOUND.code, message: ERRORS.USER_NOT_FOUND.message };
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  await (await db()).collection('users').updateOne({ email }, { $set: { password: hash } });
};

export async function handleDeleteUser(email: string) {
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const result = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (result.matchedCount !== 1 || result.modifiedCount !== 1) {
    throw {
      statusCode: 400,
      message: 'User verification failed',
    };
  }
};

export async function handleUpdateUserProjects(data: UpdateProjectSchemaType) {
  const updated_project = await (await db())
    .collection('projects')
    .updateOne({ projectSlug: data.projectSlug }, { $set: { userAccess: data.new_user_access } });
  if (!updated_project) {
    throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message };
  }

  const new_users = data.new_user_access;
  const deleted_users = data.deleted_user_access;

  for (let i = 0; i < new_users.length; i++) {
    const user = await (await db()).collection('users').findOne({ email: new_users[i] });
    if (user !== null) {
      const user_projects = user.projects;
      if (!user_projects.includes(data.projectSlug)) {
        const success = await (await db())
          .collection('users')
          .updateOne({ email: new_users[i] }, { $push: { projects: data.projectSlug } });
        if (!success) {
          throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message };
        }
      }
    }
  }

  for (let i = 0; i < deleted_users.length; i++) {
    const success = await (await db())
      .collection('users')
      .updateOne({ email: deleted_users[i] }, { $pull: { projects: data.projectSlug } });
    if (!success) {
      throw { statusCode: ERRORS.SERVER_ERROR.code, message: ERRORS.SERVER_ERROR.message};
    }
  }
  return new_users;
}

export async function handleGetUserProjects(id: string) {
  const oid = new ObjectId(id);
  const user = await (await db()).collection('users').findOne(
    { _id: oid },
    {
      projection: {
        projects: 1,
      },
    },
  );
  if (!user) {
    throw {
      statusCode: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User not found with id ${id}`,
    };
  }
  return user.projects;
}

export async function handleGetUserDetails(id: string) {
  const oid = new ObjectId(id);
  const user = await (await db()).collection('users').findOne(
    { _id: oid },
    {
      projection: {
        password: 0,
      },
    },
  );
  if (!user) {
    throw {
      status: ERRORS.RESOURCE_NOT_FOUND.code,
      message: `User with id ${id} not found`,
    };
  }
  return user;
}
