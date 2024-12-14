/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: 채용 공고 관련 API
 */
const express = require('express');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: 채용 공고 목록 조회
 *     description: 검색, 필터링, 페이지네이션 및 정렬 옵션을 통해 채용 공고를 조회합니다.
 *     tags:
 *       - Jobs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "조회할 페이지 번호 (기본값: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: "한 페이지당 항목 수 (기본값: 20)"
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: "공고 제목으로 검색"
 *       - in: query
 *         name: company_name
 *         schema:
 *           type: string
 *         description: "회사 이름으로 검색"
 *       - in: query
 *         name: employment_type
 *         schema:
 *           type: string
 *         description: "고용 형태로 필터링"
 *       - in: query
 *         name: tech_stack
 *         schema:
 *           type: string
 *         description: "기술 스택으로 필터링"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: "정렬 기준 (예: createdAt, updatedAt)"
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *           default: DESC
 *         description: "정렬 순서 (ASC 또는 DESC, 기본값: DESC)"
 *     responses:
 *       200:
 *         description: "채용 공고 목록 반환 성공"
 *       400:
 *         description: "잘못된 요청 (필터 조건 오류 등)"
 *       500:
 *         description: "서버 오류"
 */
router.get('/', getJobs);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: 채용 공고 등록
 *     description: 새로운 채용 공고를 등록합니다.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 공고 제목
 *                 example: "백엔드 개발자 모집"
 *               company_name:
 *                 type: string
 *                 description: 회사 이름
 *                 example: "테크랩스"
 *               employment_type:
 *                 type: string
 *                 description: "고용 형태 (예: 정규직, 계약직)"
 *                 example: "정규직"
 *               tech_stack:
 *                 type: string
 *                 description: 요구 기술 스택
 *                 example: "Node.js, React, AWS"
 *               salary:
 *                 type: string
 *                 description: 연봉 정보
 *                 example: "5000만원"
 *     responses:
 *       201:
 *         description: 채용 공고 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 생성된 공고 ID
 *                 title:
 *                   type: string
 *                   description: 공고 제목
 *       400:
 *         description: 채용 공고 등록 실패
 */

router.post('/', createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: 채용 공고 수정
 *     description: 기존 채용 공고를 수정합니다.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 공고의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 공고 제목
 *                 example: "백엔드 개발자 모집 (수정)"
 *               salary:
 *                 type: string
 *                 description: 수정된 연봉 정보
 *                 example: "6000만원"
 *     responses:
 *       200:
 *         description: 채용 공고 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "채용 공고 수정 성공"
 *       400:
 *         description: 채용 공고 수정 실패
 *       404:
 *         description: 공고를 찾을 수 없음
 */
router.put('/:id', updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: 채용 공고 삭제
 *     description: 특정 ID의 채용 공고를 삭제합니다.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 공고의 ID
 *     responses:
 *       200:
 *         description: 채용 공고 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *                   example: "채용 공고 삭제 성공"
 *       404:
 *         description: 공고를 찾을 수 없음
 *       400:
 *         description: 채용 공고 삭제 실패
 */
router.delete('/:id', deleteJob);

module.exports = router;
