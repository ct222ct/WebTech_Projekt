const { DataTypes } = require('sequelize');
const sequelize = require('../index2');
const Model = require('./model');
const VehicleType = require('./type');

const Vehicle = sequelize.define('Vehicle', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fuelType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition: {
        type: DataTypes.ENUM('new', 'used', 'broken'),
        allowNull: false,
    },
});

Vehicle.belongsTo(Model, { foreignKey: 'modelId' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });

module.exports = Vehicle;
