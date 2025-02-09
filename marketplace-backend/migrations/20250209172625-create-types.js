'use strict';

const { Type } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Types', Type.rawAttributes);

    // Beispieltypen einfügen
    await Type.bulkCreate([
      { name: 'Limousine', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sport', categoryId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Types');
  }
};
