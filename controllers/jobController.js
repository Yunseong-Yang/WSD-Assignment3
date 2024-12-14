const { Op } = require('sequelize');
const Job = require('../models/job');
const { formatJobResponse, formatErrorResponse } = require('../views/jobView');

const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 20, title, company_name, employment_type, tech_stack, sortBy = 'createdAt', order = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (title) whereClause.title = { [Op.like]: `%${title}%` };
    if (company_name) whereClause.company_name = { [Op.like]: `%${company_name}%` };
    if (employment_type) whereClause.employment_type = employment_type;
    if (tech_stack) whereClause.tech_stack = { [Op.like]: `%${tech_stack}%` };

    const jobs = await Job.findAll({
      where: whereClause,
      order: [[sortBy, order.toUpperCase()]],
      offset,
      limit: parseInt(limit),
    });

    return formatJobResponse(res, jobs);
  } catch (err) {
    return formatErrorResponse(res, '채용 공고 조회 실패', 'JOB_FETCH_ERROR', err.message);
  }
};

const createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);
    return formatJobResponse(res, newJob, 201);
  } catch (err) {
    return formatErrorResponse(res, '채용 공고 등록 실패', 'JOB_CREATE_ERROR', err.message, 400);
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Job.update(req.body, { where: { id } });
    if (!updated[0]) return formatErrorResponse(res, '공고를 찾을 수 없습니다', 'JOB_NOT_FOUND', null, 404);
    return formatJobResponse(res, { message: '채용 공고 수정 성공' });
  } catch (err) {
    return formatErrorResponse(res, '채용 공고 수정 실패', 'JOB_UPDATE_ERROR', err.message, 400);
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Job.destroy({ where: { id } });
    if (!deleted) return formatErrorResponse(res, '공고를 찾을 수 없습니다', 'JOB_NOT_FOUND', null, 404);
    return formatJobResponse(res, { message: '채용 공고 삭제 성공' });
  } catch (err) {
    return formatErrorResponse(res, '채용 공고 삭제 실패', 'JOB_DELETE_ERROR', err.message, 400);
  }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
