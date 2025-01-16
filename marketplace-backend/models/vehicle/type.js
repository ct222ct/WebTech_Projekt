const { DataTypes } = require('sequelize');
const sequelize = require('../index2');
const Category = require('./category');

const VehicleType = sequelize.define('VehicleType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

VehicleType.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = VehicleType;
