const { DataTypes } = require('sequelize');
const sequelize = require('../index2');
const Category = require('./category');

const Mark = sequelize.define('Mark', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Mark.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Mark;
