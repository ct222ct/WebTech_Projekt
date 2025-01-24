module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      'User',
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeSave: async (user) => {
            if (user.changed('password')) {
              const bcrypt = require('bcrypt');
              user.password = await bcrypt.hash(user.password, 10);
            }
          },
        },
      }
  );
};
