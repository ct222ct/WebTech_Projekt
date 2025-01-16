const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Category = require('./category');

module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  });

  VehicleType.associate = (models) => {
    VehicleType.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };

  return VehicleType;
};
