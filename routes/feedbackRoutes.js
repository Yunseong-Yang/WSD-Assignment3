const express = require('express');
const { createFeedback, getFeedbacksByCompany, deleteFeedback } = require('../controllers/feedbackController'); // deleteFeedback 추가
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: 피드백 관리 API
 */

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     summary: 피드백 등록
 *     tags: [Feedbacks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: 회사 ID
 *               comment:
 *                 type: string
 *                 description: 피드백 내용
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: 평점
 *     responses:
 *       201:
 *         description: 피드백 등록 성공
 *       500:
 *         description: 피드백 등록 실패
 */
router.post('/', authenticateToken, createFeedback);

/**
 * @swagger
 * /feedbacks/{company_id}:
 *   get:
 *     summary: 회사별 피드백 조회
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회사 ID
 *     responses:
 *       200:
 *         description: 피드백 조회 성공
 *       500:
 *         description: 피드백 조회 실패
 */
router.get('/:company_id', getFeedbacksByCompany);

/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     summary: 피드백 삭제
 *     tags: [Feedbacks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 피드백 ID
 *     responses:
 *       200:
 *         description: 피드백 삭제 성공
 *       500:
 *         description: 피드백 삭제 실패
 */
router.delete('/:id', authenticateToken, deleteFeedback);

module.exports = router;
