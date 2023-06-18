import database from '../../loaders/database';
import { Admin } from './admin.model';

export async function handleUpdateUser(admin: Admin) {
  const collection = await database().then(db => db.collection('<SAMPLE DB>'));
  const response = await collection.findOne({ email: admin.email });
  if (!response) {
    console.log('User not found!!');
  } else {
    console.log('User updated!!');
    collection.updateOne({ email: admin.email }, { $push: { projectSlug: admin.projectSlug } }, { upsert: true });
  }
  return response;
}
