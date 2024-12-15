const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');
const { successResponse, errorResponse } = require('../views/authView');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = '1234';
const REFRESH_SECRET_KEY = '1234';
const refreshTokenStore = {}; 
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken || !refreshTokenStore[refreshToken]) {
            return errorResponse(res, 401, 'Refresh Token이 유효하지 않습니다.');
        }
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        const newAccessToken = jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '1h' });

        // 새로운 Refresh Token 발급
        const newRefreshToken = jwt.sign({ id: decoded.id }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
        refreshTokenStore[newRefreshToken] = true; // 새 토큰 저장
        delete refreshTokenStore[refreshToken]; // 이전 토큰 제거

        successResponse(res, 200, 'Access Token 갱신 성공', {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        errorResponse(res, 403, '토큰 갱신 실패', err.message);
    }
};

// 회원 정보 수정
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id?.id || req.user.id;

        if (typeof userId !== 'number') {
            return errorResponse(res, 400, '잘못된 사용자 ID', 'User ID is not a valid number');
        }

        const { email, password, username } = req.body;

        const updates = {};
        if (email) updates.email = email;
        if (password) updates.password = await bcrypt.hash(password, 10); // bcrypt 해시 적용
        if (username) updates.username = username;

        const [updated] = await User.update(updates, { where: { id: userId } });
        if (!updated) {
            return errorResponse(res, 404, '사용자를 찾을 수 없습니다.');
        }
        successResponse(res, 200, '회원 정보 수정 성공');
    } catch (err) {
        errorResponse(res, 400, '회원 정보 수정 실패', err.message);
    }
};

// Refresh Token 발급 (회원가입, 로그인 시 사용)
exports.issueRefreshToken = (userId) => {
    const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    refreshTokenStore[refreshToken] = true; // Refresh Token 저장
    return refreshToken;
};

// 기존 회원가입, 로그인 함수 수정 시 사용
exports.registerUser = async (req, res) => { /*...*/ };
exports.loginUser = async (req, res) => { /*...*/ };

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
    refreshToken,
    updateProfile,
};
