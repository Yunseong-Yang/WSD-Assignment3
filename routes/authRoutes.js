const express = require('express');
const { registerUser, loginUser, getUserProfile, deleteUser } = require('../controllers/authController');
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
