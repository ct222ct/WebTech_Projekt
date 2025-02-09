'use strict';

const { User } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', User.rawAttributes);

    // Beispielbenutzer einfügen
    await User.bulkCreate([
      { name: 'Admin', email: 'admin@example.com', password: '12345678',address: 'Test Haus 5', createdAt: new Date(), updatedAt: new Date() },

    ]);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
