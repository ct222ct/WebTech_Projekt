module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Name der Tabelle
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        dateOfFirstRegistration: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        fuelType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        condition: {
            type: DataTypes.ENUM('new', 'used', 'broken'),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'available', // Default status is "available"
        },
    }, {
        timestamps: true,
    });

    // Associations
    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Vehicle.belongsTo(models.Mark, { foreignKey: 'markId', as: 'mark' });
        Vehicle.belongsTo(models.Model, { foreignKey: 'modelId', as: 'model' });
        Vehicle.belongsTo(models.Type, { foreignKey: 'typeId', as: 'type' });
        Vehicle.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
        Vehicle.hasMany(models.VehiclePicture, { foreignKey: 'vehicleId', as: 'pictures' });
    };

    return Vehicle;
};
