const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./job').sequelize;
const Company = require('./company');

const Feedback = sequelize.define(
  'Feedbacks',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    company_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Company, key: 'id' } },
    comment: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Feedback;
