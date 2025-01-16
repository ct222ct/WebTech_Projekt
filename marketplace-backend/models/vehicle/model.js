'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    markId: {
      type: DataTypes.INTEGER,
      references: { model: 'Marks', key: 'id' },
    },
  }, {});
  Model.associate = function(models) {
    Model.belongsTo(models.Mark, { foreignKey: 'markId' });
  };
  return Model;
};
