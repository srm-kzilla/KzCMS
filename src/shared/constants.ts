export const JWT_CONFIG = {
  expiresIn: '30d',
};

export const STATUS = {
  OK: 200,
};

export const MESSAGES_TEXT = {
  FETCH_USERS: 'User(s) Fetched Successfully',
  FETCH_USER_DETAILS: 'User Details Fetched Successfully',
  CREATE_USER: 'User Created Successfully',
  DELETE_USER: 'User Deleted Successfully',
  UPDATE_USER: 'User Updated Successfully',
  UPDATE_USER_ACCESS: 'User Access Updated Successfully',
  VERIFY_USER: 'Verification Status Updated Successfully',
  LOGIN_USER: 'User Logged In Successfully',
  IMAGE_UPDATED: 'Image Updated Successfully',
  CREATE_PROJECT: 'Project Created Successfully',
  CREATE_PROJECT_DATA: 'Project Data Created Successfully',
  UPDATE_PROJECT_ACCESS: 'Project Status Updated',
  UPDATE_PROJECT_METADATA: 'Project Updated Successfully',
  DELETE_PROJECT: 'Project Deleted Successfully',
  DELETE_PROJECT_DATA: 'Project Data Deleted Successfully',
};

export const LINK_REGEX_PATTERN = /https:\/\/[\w.-]+\.s3\.ap-south-1\.amazonaws\.com\/(.+)/;

export const SALT_ROUNDS = 10;
export const MONGODB_URI_REGEX_PATTERN = /^mongodb(?:\+srv)?:\/\/(?:\w+:\w+@)?\w+(?:\.\w+)*(?::\d+)?(?:\/\w+)?(?:\?\w+=\w+)?/g;
