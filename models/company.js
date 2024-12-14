const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./job').sequelize;

const Company = sequelize.define(
  'Companies',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    location: { type: DataTypes.STRING },
    industry: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: false, // createdAt 및 updatedAt 비활성화
    freezeTableName: true, // 테이블 이름 고정
  }
);

module.exports = Company;
