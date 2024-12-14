const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('saramin', 'yys3504', '1234', {
  host: '113.198.66.75',
  port: 13131,
  dialect: 'mysql',
});

const Job = sequelize.define(
  'Jobs',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    job_group: { type: DataTypes.STRING },
    badge: { type: DataTypes.STRING },
    company_name: { type: DataTypes.STRING },
    title: { type: DataTypes.STRING },
    deadline: { type: DataTypes.STRING },
    address_main: { type: DataTypes.STRING },
    address_total: { type: DataTypes.STRING },
    experience: { type: DataTypes.STRING },
    education: { type: DataTypes.STRING },
    employment_type: { type: DataTypes.STRING },
    salary: { type: DataTypes.STRING },
    tech_stack: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.STRING },
    crawledAt: { type: DataTypes.DATE },
    url: { type: DataTypes.STRING(768), unique: true },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Job;
