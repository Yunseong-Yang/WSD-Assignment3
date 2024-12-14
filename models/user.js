const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./job').sequelize;

const User = sequelize.define('Users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
}, {
    timestamps: false, // 이 설정으로 createdAt과 updatedAt 생성을 막음
    freezeTableName: true
});

module.exports = User;
