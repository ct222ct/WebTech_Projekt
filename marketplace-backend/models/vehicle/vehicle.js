module.exports = (sequelize, DataTypes) => {
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        dateOfFirstRegistration: {
            type: DataTypes.DATEONLY,
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

    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.Mark, { foreignKey: 'markId' });
        Vehicle.belongsTo(models.Model, { foreignKey: 'modelId' });
        Vehicle.belongsTo(models.Type, { foreignKey: 'typeId' });
    };

    return Vehicle;
};
