'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: { type: DataTypes.STRING, allowNull: false },
    modelId: { type: DataTypes.INTEGER, allowNull: false },
    typeId: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    description: { type: DataTypes.TEXT },
    registrationDate: { type: DataTypes.DATE },
    mileage: { type: DataTypes.INTEGER },
    fuel: { type: DataTypes.STRING },
    color: { type: DataTypes.STRING },
    condition: { type: DataTypes.STRING },
  });
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.Model, { foreignKey: 'modelId' });
    Vehicle.belongsTo(models.Type, { foreignKey: 'typeId' });
  };
  return Vehicle;
};
