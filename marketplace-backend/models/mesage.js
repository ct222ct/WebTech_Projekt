const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Vehicle = require('./vehicle/vehicle');

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

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });
Message.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

module.exports = Message;
