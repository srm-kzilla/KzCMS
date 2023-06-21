import database from '../../loaders/database';

export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
}

export async function handleExistingUser(email, password) {
  return { email: email, password: password };
}
