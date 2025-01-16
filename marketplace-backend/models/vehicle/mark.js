'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: { model: 'Categories', key: 'id' },
    },
  }, {});
  Mark.associate = function(models) {
    Mark.hasMany(models.Model, { foreignKey: 'markId' });
    Mark.belongsTo(models.Category, { foreignKey: 'categoryId' });
  };
  return Mark;
};
