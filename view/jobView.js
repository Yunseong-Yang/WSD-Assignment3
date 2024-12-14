const formatJobResponse = (res, data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data,
    });
  };
  
  const formatErrorResponse = (res, message, code, error = null, status = 500) => {
    return res.status(status).json({
      status: 'error',
      message,
      code,
      error,
    });
  };
  
  module.exports = { formatJobResponse, formatErrorResponse };
  