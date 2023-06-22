export const SERVER_ERROR = {
    code: 500,
    message: {
      error: 'Server Error',
      error_description: 'Something bad happened at the server.',
    },
  };
  
  export const MISSING_ACCESS_TOKEN = {
    code: 401,
    message: {
      error: 'unauthorized',
      error_description: 'Authorization token is required',
    },
  };
  export const INVALID_ACCESS_TOKEN = {
    code: 401,
    message: {
      error: 'unauthorized',
      error_description: 'Invalid token',
    },
  };
  export const RESOURCE_NOT_FOUND = {
    code: 404,
    message: {
      error: 'not found',
      error_description: 'Resource was not found',
    },
  };
  
  export const MALFORMED_BODY = {
    code: 400,
    message: {
      error: 'bad request',
      error_description: 'Malformed body passed',
    },
  };

