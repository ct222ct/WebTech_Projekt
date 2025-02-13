//model.js
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    markId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Marks',
        key: 'id',
      },
    },
  });

  // Assoziationen
  Model.associate = (models) => {
    Model.belongsTo(models.Mark, { foreignKey: 'markId', as: 'mark' });
    Model.hasMany(models.Vehicle, { foreignKey: 'modelId', as: 'vehicles' });
  };

  return Model;
};
