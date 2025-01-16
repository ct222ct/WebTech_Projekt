'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: 'Categories', key: 'id' },
    },
  }, {});
  Type.associate = function(models) {
    Type.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Type;
};
