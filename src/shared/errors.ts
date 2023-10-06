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
      error: 'Unauthorized',
      error_description: 'Authorization token is required',
    },
  },
  UNAUTHORIZED: {
    code: 401,
    message: {
      error: 'Unauthorized',
      error_description: "You don't have permission to access this resource",
    },
  },
  FORBIDDEN_ACCESS_ERROR: {
    code: 403,
    message: {
      error: 'Access Forbidden',
      error_description: "You don't have authorization to access this resource",
    },
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Not Found',
      error_description: 'Resource was not found',
    },
  },

  USER_NOT_FOUND: {
    code: 404,
    message: {
      error: 'User Not Found',
      error_description: 'User does not exists',
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
  USER_ALREADY_DELETED: {
    code: 409,
    message: {
      error: 'User Already Deleted',
      error_description: 'User already deleted',
    },
  },
  INVARIANT_PROJECT_STATUS: {
    code: 409,
    message: {
      error: 'Project Status Unchanged',
      error_description: 'Project status matches the current status',
    },
  },
};
