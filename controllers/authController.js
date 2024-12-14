const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');
const { successResponse, errorResponse } = require('../views/authView');

// 회원 가입
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        successResponse(res, 201, '회원 가입 성공', { user });
    } catch (err) {
        errorResponse(res, 400, '회원 가입 실패', err.message);
    }
};

// 로그인
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email, password } });
        if (!user) {
            return errorResponse(res, 401, '잘못된 자격 증명');
        }
        const token = generateToken({ id: user.id });
        successResponse(res, 200, '로그인 성공', { token });
    } catch (err) {
        errorResponse(res, 500, '로그인 오류', err.message);
    }
};

// 회원 정보 조회
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id?.id || req.user.id;

        if (typeof userId !== 'number') {
            return errorResponse(res, 400, '잘못된 사용자 ID', 'User ID is not a valid number');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return errorResponse(res, 404, '사용자를 찾을 수 없습니다.');
        }
        successResponse(res, 200, '회원 정보 조회 성공', { user });
    } catch (err) {
        errorResponse(res, 500, '회원 정보 조회 실패', err.message);
    }
};

// 회원 탈퇴
const deleteUser = async (req, res) => {
    try {
        // req.user.id에서 올바른 값을 추출
        const userId = req.user.id?.id || req.user.id;

        if (typeof userId !== 'number') {
            return errorResponse(res, 400, '잘못된 사용자 ID', 'User ID is not a valid number');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return errorResponse(res, 404, '사용자를 찾을 수 없습니다.');
        }
        await user.destroy();
        successResponse(res, 200, '회원 탈퇴 완료');
    } catch (err) {
        errorResponse(res, 500, '회원 탈퇴 실패', err.message);
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    deleteUser,
};
