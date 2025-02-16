'use strict';

const { Message } = require('../models'); // Importiere das Modell

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', Message.rawAttributes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};
