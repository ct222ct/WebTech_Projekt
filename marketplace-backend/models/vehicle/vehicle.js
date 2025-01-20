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
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateOfFirstRegistration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        condition: {
            type: DataTypes.ENUM('new', 'used', 'broken'),
            allowNull: false,
        },
    });

    // Beziehungen zu anderen Modellen
    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
        Vehicle.belongsTo(models.Mark, { foreignKey: 'markId', as: 'mark' });
        Vehicle.belongsTo(models.Model, { foreignKey: 'modelId', as: 'model' });
        Vehicle.belongsTo(models.Type, { foreignKey: 'typeId', as: 'type' });
    };

    return Vehicle;
};
