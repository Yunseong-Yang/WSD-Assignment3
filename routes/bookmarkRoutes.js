/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: 북마크 API
 */
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { addOrRemoveBookmark, getBookmarks } = require('../controllers/bookmarkController');

const router = express.Router();

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: 북마크 추가/제거
 *     tags: [Bookmark]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               job_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 북마크 제거 성공
 *       201:
 *         description: 북마크 추가 성공
 *       400:
 *         description: 북마크 실패
 */
router.post('/', authenticateToken, addOrRemoveBookmark);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: 북마크 목록 조회
 *     tags: [Bookmark]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 북마크 목록 반환
 *       500:
 *         description: 북마크 조회 실패
 */
router.get('/', authenticateToken, getBookmarks);

module.exports = router;
