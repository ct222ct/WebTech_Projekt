const { DataTypes } = require('sequelize');
const sequelize = require('../index2');
console.log('Sequelize Instance:', sequelize);


const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
