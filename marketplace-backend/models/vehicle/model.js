const { DataTypes } = require('sequelize');
const sequelize = require('../index2');
const Mark = require('./mark');

const Model = sequelize.define('Model', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Model.belongsTo(Mark, { foreignKey: 'markId' });

module.exports = Model;
