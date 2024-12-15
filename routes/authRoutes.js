const express = require('express');
const { registerUser, loginUser, getUserProfile, deleteUser, refreshToken, updateProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 회원 관리 API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원 가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원 가입 성공
 *       400:
 *         description: 회원 가입 실패
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 자격 증명 실패
 *       500:
 *         description: 로그인 오류
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: 회원 정보 조회
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 회원 정보 조회 성공
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 회원 정보 조회 실패
 */
router.get('/profile', authenticateToken, getUserProfile);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: 토큰 갱신
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: 유효한 Refresh Token
 *     responses:
 *       200:
 *         description: Access Token 갱신 성공
 *       401:
 *         description: Refresh Token이 유효하지 않음
 *       403:
 *         description: 갱신 실패
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: 회원 정보 수정
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원 정보 수정 성공
 *       400:
 *         description: 수정 실패
 *       404:
 *         description: 사용자 없음
 */
router.put('/profile', authenticateToken, updateProfile);


/**
 * @swagger
 * /auth/profile:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 회원 탈퇴 성공
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 회원 탈퇴 실패
 */
router.delete('/profile', authenticateToken, deleteUser);

module.exports = router;
