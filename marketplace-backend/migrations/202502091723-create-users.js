'use strict';

const { User } = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', User.rawAttributes);

    // Beispielbenutzer einfügen
    const salt = await bcrypt.genSalt(10);
    const password_hashed = await bcrypt.hash('12345678', salt);
    await User.bulkCreate([
      { name: 'Admin', email: 'admin@example.com', password: password_hashed,address: 'Test Haus 5', createdAt: new Date(), updatedAt: new Date() },

    ]);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
