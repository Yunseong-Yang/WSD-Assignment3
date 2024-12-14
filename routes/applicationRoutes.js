const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    createApplication,
    getApplications,
    deleteApplication,
} = require('../controllers/applicationController');

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: 지원 관련 API
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 지원하기
 *     tags: [Applications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               job_id:
 *                 type: integer
 *                 description: 지원할 채용 공고 ID
 *                 example: 1
 *     responses:
 *       201:
 *         description: 지원 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
router.post('/', authenticateToken, createApplication);

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: 지원 내역 조회
 *     tags: [Applications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: 지원 내역 조회 성공
 *       500:
 *         description: 서버 오류
 */
router.get('/', authenticateToken, getApplications);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: 지원 취소
 *     tags: [Applications]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 취소할 지원 내역 ID
 *     responses:
 *       200:
 *         description: 지원 취소 성공
 *       404:
 *         description: 지원 내역을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', authenticateToken, deleteApplication);

module.exports = router;
