export const ERRORS = {
  SERVER_ERROR: {
    code: 500,
    message: {
      error: 'Internal Server Error',
      error_description: 'Something bad happened at the server',
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
      error_description: 'Please provide a valid status of the project',
    },
  },
  DATA_OPERATION_FAILURE: {
    code: 400,
    message: {
      error: 'Bad Request',
      error_description: 'Data operation failed',
    },
  },
  MISSING_ACCESS_TOKEN: {
    code: 401,
    message: {
      error: 'Access Token Not Found',
      error_description: 'Access token is required for authorization',
    },
  },
  UNAUTHORIZED: {
    code: 401,
    message: {
      error: 'Authorization Failure',
      error_description: 'User authorization failed',
    },
  },
  USER_NOT_VERIFIED: {
    code: 401,
    message: {
      error: 'User Not Verified',
      error_description: 'User must be verified to login',
    },
  },
  INVALID_CREDENTIALS: {
    code: 401,
    message: {
      error: 'Password Invalid',
      error_description: 'Invalid password entered by the user',
    },
  },
  FORBIDDEN_ACCESS_ERROR: {
    code: 403,
    message: {
      error: 'Resource Access Forbidden',
      error_description: "You don't have authorization to access this resource",
    },
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Resource Not Found',
      error_description: 'Resource was not found',
    },
  },

  USER_NOT_FOUND: {
    code: 404,
    message: {
      error: 'User Not Found',
      error_description: 'User does not exist',
    },
  },
  ENDPOINT_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Endpoint Not Found',
      error_description: 'Endpoint not found',
    },
  },
  RESOURCE_CONFLICT: {
    code: 409,
    message: {
      error: 'Resource Conflict',
      error_description: 'Resource already exists',
    },
  },
  USER_ALREADY_EXSIST: {
    code: 409,
    message: {
      error: 'User Already Exsist',
      error_description: 'User with the same email already exsist! Try Login?',
    },
  },
  USER_ALREADY_DELETED: {
    code: 409,
    message: {
      error: 'User Already Deleted',
      error_description: 'User has been already deleted',
    },
  },
  INVARIANT_PROJECT_STATUS: {
    code: 409,
    message: {
      error: 'Project Status Unchanged',
      error_description: 'Project status matches the current status',
    },
  },
  FAILED_USER_VALIDATION: {
    code: 422,
    message: {
      error: 'Verification Failure',
      error_description: 'User verification failed',
    },
  },
};
