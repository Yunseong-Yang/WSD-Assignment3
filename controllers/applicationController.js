const Application = require('../models/application');
const { handleSuccess, handleError } = require('../views/applicationView');

exports.createApplication = async (req, res) => {
    try {
        const { job_id } = req.body;

        // 중첩된 id 처리
        const user_id = req.user.id.id || req.user.id;

        if (isNaN(parseInt(user_id, 10))) {
            return res.status(400).json({
                status: 'error',
                message: '잘못된 사용자 ID',
                error: 'User ID is not a valid number',
            });
        }

        // 데이터베이스에 삽입
        const newApplication = await Application.create({
            user_id,
            job_id,
            appliedAt: new Date(),
        });

        handleSuccess(res, 201, { message: '지원 성공', application: newApplication });
    } catch (err) {
        handleError(res, 500, '지원 실패', err.message);
    }
};


exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.findAll();
        handleSuccess(res, 200, applications);
    } catch (err) {
        handleError(res, 500, '지원 내역 조회 실패', err.message);
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params; // 지원 내역 ID
        const user_id = req.user.id.id || req.user.id; // 중첩된 사용자 ID 처리

        // user_id가 숫자가 아닌 경우 예외 처리
        if (isNaN(parseInt(user_id, 10))) {
            return res.status(400).json({
                status: 'error',
                message: '잘못된 사용자 ID',
                error: 'User ID is not a valid number',
            });
        }

        // 지원 내역 조회
        const application = await Application.findOne({ where: { id, user_id } });

        if (!application) {
            return handleError(res, 404, '지원 내역을 찾을 수 없습니다.');
        }

        // 지원 내역 삭제
        await application.destroy();
        return handleSuccess(res, 200, { message: '지원 취소 완료' });
    } catch (err) {
        return handleError(res, 500, '지원 취소 실패', err.message);
    }
};
