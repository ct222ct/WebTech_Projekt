module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Mark, { foreignKey: 'categoryId' });
    Category.hasMany(models.Type, { foreignKey: 'categoryId' });
  };

  return Category;
};
