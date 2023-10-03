export const JWT_CONFIG = {
  expiresIn: '30d',
};

export const STATUS = {
  OK: 200,
};

export const MESSAGES_TEXT = {
  FETCH_USERS: 'Users Fetched Successfully',
  UPDATE_USER: 'User Updated Successfully',
  IMAGE_UPDATED: 'Image Updated Successfully',
  UPDATE_USER_ACCESS: 'User Access Updated Successfully',
  UPDATE_PROJECT_ACCESS:  'Project Status Updated'
};

export const LINK_REGEX_PATTERN = /https:\/\/[\w.-]+\.s3\.ap-south-1\.amazonaws\.com\/(.+)/;

export const SALT_ROUNDS = 10;
export const MONGODB_URI_REGEX_PATTERN = /^mongodb(?:\+srv)?:\/\/(?:\w+:\w+@)?\w+(?:\.\w+)*(?::\d+)?(?:\/\w+)?(?:\?\w+=\w+)?/g;