const Feedback = require('../models/feedback');
const { successResponse, errorResponse } = require('../views/feedbackView');

exports.createFeedback = async (req, res) => {
    try {
        const { company_id, comment, rating } = req.body;

        // req.user 객체에서 중첩된 id를 처리
        const user_id = req.user?.id?.id;

        if (!user_id) {
            return errorResponse(
                res,
                '인증 실패',
                'AUTHENTICATION_ERROR',
                '사용자 정보가 유효하지 않습니다.'
            );
        }

        const newFeedback = await Feedback.create({
            user_id,
            company_id,
            comment,
            rating,
        });

        successResponse(res, newFeedback, 201);
    } catch (err) {
        errorResponse(res, '피드백 생성 실패', 'FEEDBACK_CREATION_ERROR', err.message);
    }
};
  exports.getFeedbacksByCompany = async (req, res) => {
    try {
      const { company_id } = req.params;
      const feedbacks = await Feedback.findAll({ where: { company_id } });
  
      successResponse(res, feedbacks);
    } catch (err) {
      errorResponse(res, '피드백 조회 실패', 'FEEDBACK_FETCH_ERROR', err.message);
    }
  };

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id?.id;

    const feedback = await Feedback.findOne({ where: { id, user_id } });
    if (!feedback) throw new Error('피드백을 찾을 수 없습니다.');

    await feedback.destroy();
    successResponse(res, { message: '피드백 삭제 성공' });
  } catch (err) {
    errorResponse(res, '피드백 삭제 실패', 'FEEDBACK_DELETION_ERROR', err.message);
  }
};
