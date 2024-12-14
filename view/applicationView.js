const handleSuccess = (res, statusCode, data) => {
    res.status(statusCode).json({ status: 'success', data });
};

const handleError = (res, statusCode, message, error) => {
    res.status(statusCode).json({ status: 'error', message, error });
};

module.exports = { handleSuccess, handleError };
