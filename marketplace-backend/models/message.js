module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        chatId: { type: DataTypes.INTEGER, allowNull: false },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false },
    });

    Message.associate = (models) => {
        Message.belongsTo(models.Chat, { foreignKey: 'chatId' });
        Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    };

    return Message;
};
