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
    };

    return Vehicle;
};
