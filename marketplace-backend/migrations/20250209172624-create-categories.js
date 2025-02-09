'use strict';

const { Category } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', Category.rawAttributes);

    // Beispielkategorien einfügen
    await Category.bulkCreate([
      { name: 'Auto', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Motorrad', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};
