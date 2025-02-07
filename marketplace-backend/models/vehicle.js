//Vehicle.js
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
    });

    // Assoziationen
    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Vehicle.belongsTo(models.Mark, { foreignKey: 'markId', as: 'mark' });
        Vehicle.belongsTo(models.Model, { foreignKey: 'modelId', as: 'model' });
        Vehicle.belongsTo(models.Type, { foreignKey: 'typeId', as: 'type' });
        Vehicle.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    };

    return Vehicle;
};
