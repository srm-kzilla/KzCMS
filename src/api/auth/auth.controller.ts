import { handleGetUser } from './auth.service';

export const getUser = (req, res) => {
  const data = handleGetUser();
  res.status(200).json(data);
};
