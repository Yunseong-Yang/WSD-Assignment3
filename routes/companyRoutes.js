const express = require('express');
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: 모든 회사 조회
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: 회사 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 회사 ID
 *                   name:
 *                     type: string
 *                     description: 회사 이름
 *                   location:
 *                     type: string
 *                     description: 회사 위치
 *                   industry:
 *                     type: string
 *                     description: 회사 업계
 *                   size:
 *                     type: integer
 *                     description: 회사 직원 수
 *                   description:
 *                     type: string
 *                     description: 회사 설명
 *       500:
 *         description: 서버 오류
 */
router.get('/', getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: 특정 회사 조회
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회사 ID
 *     responses:
 *       200:
 *         description: 회사 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: 회사 ID
 *                 name:
 *                   type: string
 *                   description: 회사 이름
 *                 location:
 *                   type: string
 *                   description: 회사 위치
 *                 industry:
 *                   type: string
 *                   description: 회사 업계
 *                 size:
 *                   type: integer
 *                   description: 회사 직원 수
 *                 description:
 *                   type: string
 *                   description: 회사 설명
 *       404:
 *         description: 회사를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/:id', getCompanyById);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: 회사 등록
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 회사 이름
 *                 example: "OpenAI Inc."
 *               location:
 *                 type: string
 *                 description: 회사 위치
 *                 example: "California, USA"
 *               industry:
 *                 type: string
 *                 description: 회사 업계
 *                 example: "Artificial Intelligence"
 *               size:
 *                 type: string
 *                 description: 회사 직원 수
 *                 example: "2000"
 *               description:
 *                 type: string
 *                 description: 회사 설명
 *                 example: "A company specializing in AI research and development."
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: 회사 등록 성공
 *       400:
 *         description: 요청 데이터가 잘못됨
 */
router.post('/', createCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: 회사 정보 수정
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 회사의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 회사 이름
 *                 example: "Updated OpenAI Inc."
 *               location:
 *                 type: string
 *                 description: 회사 위치
 *                 example: "New York, USA"
 *               industry:
 *                 type: string
 *                 description: 회사 업계
 *                 example: "Tech and AI"
 *               size:
 *                 type: string
 *                 description: 회사 직원 수
 *                 example: "3000"
 *               description:
 *                 type: string
 *                 description: 회사 설명
 *                 example: "Updated company description for AI research."
 *     responses:
 *       200:
 *         description: 회사 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회사 수정 성공"
 *       400:
 *         description: 요청 데이터가 잘못됨
 *       404:
 *         description: 회사 정보를 찾을 수 없음
 */
router.put('/:id', updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: 회사 삭제
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 회사 ID
 *     responses:
 *       200:
 *         description: 회사 삭제 성공
 *       404:
 *         description: 회사가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', deleteCompany);

module.exports = router;
