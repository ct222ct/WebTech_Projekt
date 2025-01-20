module.exports = (sequelize, DataTypes) => {
  const Mark = sequelize.define('Mark', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Mark;
};
