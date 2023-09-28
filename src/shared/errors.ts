export const ERRORS = {
  SERVER_ERROR: {
    code: 500,
    message: {
      error: 'Internal Server Error',
      error_description: 'Something bad happened at the server.',
    },
  },
  MISSING_ACCESS_TOKEN: {
    code: 401,
    message: {
      error: 'unauthorized',
      error_description: 'Authorization token is required',
    },
  },
  INVALID_ACCESS_TOKEN: {
    code: 401,
    message: {
      error: 'Unauthorized',
      error_description: 'Invalid token',
    },
  },
  UNAUTHORIZED: {
    code: 401,
    message: {
      error: 'Unauthorized',
      error_description: "You don't have permission to access this resource",
    },
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Not Found',
      error_description: 'Resource was not found',
    },
  },

  MALFORMED_BODY: {
    code: 400,
    message: {
      error: 'Bad Request',
      error_description: 'Malformed body passed',
    },
  },
  MALFORMED_PROJECT_STATUS: {
    code: 400,
    message: {
      error: 'Bad Request',
      error_description: 'Please provide a valid status of the project'
    },
  },
  USER_NOT_FOUND: {
    code: 404,
    message: {
      error: 'User Not Found',
      error_description: 'User Does Not Exists',
    },
  },
  RESOURCE_CONFLICT: {
    code: 409,
    message: {
      error: 'Resource Conflict',
      error_description: 'Resource already exists',
    },
  },
  USER_ALREADY_DELETED: {
    code: 409,
    message: {
      error: 'User Already Deleted',
      error_description: 'User already deleted',
    },
  },
};
