module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    // Optional: Beziehungen zu anderen Modellen definieren
    Message.associate = (models) => {
        Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
        Message.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    };

    return Message;
};
