const successResponse = (res, data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data,
    });
  };
  
  const errorResponse = (res, message, code, error = null, status = 500) => {
    return res.status(status).json({
      status: 'error',
      message,
      code,
      error,
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
  };
  