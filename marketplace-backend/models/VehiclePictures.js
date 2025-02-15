module.exports = (sequelize, DataTypes) => {
    const VehiclePictures = sequelize.define('VehiclePictures', {
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
    VehiclePictures.associate = (models) => {
        VehiclePictures.belongsTo(models.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
    };

    return VehiclePictures;
};
