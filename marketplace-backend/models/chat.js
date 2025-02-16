module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        buyerId: { type: DataTypes.INTEGER, allowNull: false },
        sellerId: { type: DataTypes.INTEGER, allowNull: false },
        vehicleId: { type: DataTypes.INTEGER, allowNull: false },
    });

    Chat.associate = (models) => {
        Chat.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' });
        Chat.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
        Chat.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
        Chat.hasMany(models.Message, { foreignKey: 'chatId', as: 'messages' });
    };

    return Chat;
};
