import db from '@/loaders/database';
import { updateProjectSchemaType } from '@/shared/types/admin/admin.schema';
interface User {
  name: string;
  age: number;
}

export const handleGetUsers = (): User[] => {
  return [
    {
      name: 'Utkarshini',
      age: 19,
    },
  ];
};

export const handleUpdateUser = (): User => {
  return { name: 'john', age: 23 };
};

export async function handleDeleteUser(email: string) {
  await (await db()).collection('users').updateOne({ email }, { $set: { isDeleted: true } });
}

export const handleVerifyUser = async (email: string, verify: boolean): Promise<void> => {
  const success = await (await db()).collection('users').updateOne({ email }, { $set: { isVerified: verify } });

  if (!(success.modifiedCount == 1)) {
    throw {
      statusCode: 400,
      message: 'User verification failed',
    };
  }
};

export async function handleUpdateUserProjects(data: updateProjectSchemaType) {
  const updated_project = await (await db())
    .collection('projects')
    .updateOne({ projectSlug: data.projectSlug }, { $set: { userAccess: data.new_user_access } });
  if (!updated_project) {
    throw { statusCode: 404, message: 'Project access not modified' };
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
          throw { statusCode: 404, message: 'User access not modified' };
        }
      }
    }
  }

  for (let i = 0; i < deleted_users.length; i++) {
    const success = await (await db())
      .collection('users')
      .updateOne({ email: deleted_users[i] }, { $pull: { projects: data.projectSlug } });
    if (!success) {
      throw { statusCode: 404, message: 'User access not modified' };
    }
  }
  return new_users;
}
