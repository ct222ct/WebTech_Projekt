module.exports = (sequelize, DataTypes) => {
    const VehiclePicture = sequelize.define('VehiclePicture', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Vehicles', // Name der Tabelle
                key: 'id',
            },
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Associations
    VehiclePicture.associate = (models) => {
        VehiclePicture.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
    };

    return VehiclePicture;
};
