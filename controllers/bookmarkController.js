const Bookmark = require('../models/bookmark');
const { sendResponse, sendError } = require('../views/bookmarkView');

const addOrRemoveBookmark = async (req, res) => {
  try {
    const { user_id, job_id } = req.body;
    const existing = await Bookmark.findOne({ where: { user_id, job_id } });

    if (existing) {
      await existing.destroy();
      return sendResponse(res, 200, { message: '북마크 제거 성공' });
    }

    const bookmark = await Bookmark.create({ user_id, job_id });
    sendResponse(res, 201, bookmark);
  } catch (err) {
    sendError(res, 400, err);
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user_id = req.user.id; // Assuming `req.user` is populated by authentication middleware
    const bookmarks = await Bookmark.findAll({ where: { user_id } });
    sendResponse(res, 200, bookmarks);
  } catch (err) {
    sendError(res, 500, err);
  }
};

module.exports = {
  addOrRemoveBookmark,
  getBookmarks,
};
