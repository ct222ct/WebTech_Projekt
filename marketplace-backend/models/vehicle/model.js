module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Model.associate = (models) => {
    Model.belongsTo(models.Mark, { foreignKey: 'markId' });
    Model.belongsToMany(models.Type, {
      through: 'ModelTypes',
      foreignKey: 'modelId',
    });
  };

  return Model;
};
