module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
  });

  // Assoziationen
  Type.associate = (models) => {
    Type.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
  };

  return Type;
};
