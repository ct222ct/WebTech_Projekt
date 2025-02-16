'use strict';

const { Chat } = require('../models'); // Importiere das Modell

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', Chat.rawAttributes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};
