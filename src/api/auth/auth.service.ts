export async function handleAddNewUser(email, password) {
  return { email: email, password: password };
}

export async function handleLoginExistingUser(email, password) {
  return { email: email, password: password };
}
