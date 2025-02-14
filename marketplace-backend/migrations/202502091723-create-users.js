'use strict';

const { User } = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', User.rawAttributes);

    // Beispielbenutzer einfügen
    const salt = await bcrypt.genSalt(10);
    const password_hashed = await bcrypt.hash('12345678', salt);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: password_hashed,
        street: 'Test Straße 5',
        city: 'Ferlach',
        postalCode: '9170',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
