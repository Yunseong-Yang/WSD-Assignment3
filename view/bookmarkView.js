const sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
  };
  
  const sendError = (res, statusCode, error) => {
    res.status(statusCode).json({
      status: 'error',
      error: error.message || 'An unexpected error occurred.',
    });
  };
  
  module.exports = {
    sendResponse,
    sendError,
  };
  