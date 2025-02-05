module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  // Assoziationen
  Category.associate = (models) => {
    // Assoziation zu Mark mit einem eindeutigen Alias
    Category.hasMany(models.Mark, { foreignKey: 'categoryId', as: 'categoryMarks' });

    // Assoziation zu Type mit einem eindeutigen Alias
    Category.hasMany(models.Type, { foreignKey: 'categoryId', as: 'categoryTypes' });
  };

  return Category;
};
