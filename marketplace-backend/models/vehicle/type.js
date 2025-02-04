module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Type.associate = (models) => {
    Type.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Type.belongsToMany(models.Model, {
      through: 'ModelTypes',
      foreignKey: 'typeId',
    });
  };

  return Type;
};
