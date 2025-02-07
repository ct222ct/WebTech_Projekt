//mark.js
module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
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
  Mark.associate = (models) => {
    Mark.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Mark.hasMany(models.Model, { foreignKey: 'markId', as: 'models' });
    Mark.hasMany(models.Vehicle, { foreignKey: 'markId', as: 'vehicles' });
  };

  return Mark;
};
