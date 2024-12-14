const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./job').sequelize;

const Bookmark = sequelize.define('Bookmarks', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  job_id: { type: DataTypes.INTEGER, allowNull: false },
  bookmarkedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
    timestamps: false, // 이 설정으로 createdAt과 updatedAt 생성을 막음
    freezeTableName: true
});

module.exports = Bookmark;
