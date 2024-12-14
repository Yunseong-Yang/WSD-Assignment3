const Company = require('../models/company');
const { successResponse, errorResponse } = require('../views/companyView');

exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.findAll();
      if (!companies || companies.length === 0) {
        return errorResponse(res, '회사 데이터를 찾을 수 없습니다.', 'COMPANY_NOT_FOUND', null, 404);
      }
      successResponse(res, companies);
    } catch (err) {
      errorResponse(res, '회사 데이터 조회 실패', 'COMPANY_FETCH_ERROR', err.message, 500);
    }
  };

  exports.getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByPk(id);

        if (!company) {
            return errorResponse(res, '회사를 찾을 수 없습니다.', 'NOT_FOUND', null, 404);
        }

        // Sequelize 인스턴스를 JSON으로 변환
        const companyData = company.toJSON();

        successResponse(res, companyData, 200);
    } catch (err) {
        errorResponse(res, '회사 상세 조회 실패', 'SERVER_ERROR', err.message, 500);
    }
};

exports.createCompany = async (req, res) => {
    try {
        // 요청 바디에서 모든 필드 추출
        const { name, location = null, industry = null, size = null, description = null } = req.body;

        // 회사 등록
        const newCompany = await Company.create({
            name,
            location,
            industry,
            size,
            description,
        });

        successResponse(res, { message: '회사 등록 성공', company: newCompany }, 201);
    } catch (error) {
        errorResponse(res, '회사 등록 실패', 400, error.message);
    }
};

exports.updateCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location, industry, size, description } = req.body;
  
      // Null 값 처리 및 업데이트할 데이터 필터링
      const updatedData = {
        ...(name && { name }),
        ...(location && { location }),
        ...(industry && { industry }),
        ...(size && { size }),
        ...(description && { description }),
      };
  
      // 데이터가 없으면 에러 처리
      if (Object.keys(updatedData).length === 0) {
        return errorResponse(res, 400, '업데이트할 데이터가 없습니다.');
      }
  
      // 업데이트 실행
      const [updated] = await Company.update(updatedData, { where: { id } });
  
      if (!updated) {
        return errorResponse(res, 404, '회사를 찾을 수 없습니다.');
      }
  
      successResponse(res, { message: '회사 수정 성공' });
    } catch (err) {
      errorResponse(res, 500, '회사 수정 실패', err.message);
    }
  };

  exports.deleteCompany = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 요청한 ID에 해당하는 회사가 존재하는지 확인
      const company = await Company.findOne({ where: { id } });
      if (!company) {
        return errorResponse(res, '회사를 찾을 수 없습니다.', 'NOT_FOUND', null, 404);
      }
  
      // 회사 삭제
      await company.destroy();
      return successResponse(res, { message: '회사 삭제 성공' }, 200);
    } catch (err) {
      return errorResponse(res, '회사 삭제 실패', 'DELETE_ERROR', err.message, 500);
    }
  };
