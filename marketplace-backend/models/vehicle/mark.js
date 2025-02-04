module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Mark.associate = (models) => {
    Mark.belongsTo(models.Category, { foreignKey: 'categoryId' });
    Mark.hasMany(models.Model, { foreignKey: 'markId' });
  };

  return Mark;
};
