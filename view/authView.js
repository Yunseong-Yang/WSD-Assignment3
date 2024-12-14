// authView.js

// 성공 응답
const successResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status: 'success',
        message,
        data,
    });
};

// 에러 응답
const errorResponse = (res, status, message, error = null) => {
    res.status(status).json({
        status: 'error',
        message,
        error,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
