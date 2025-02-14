'use strict';

const { Type } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Types', Type.rawAttributes);

    // Beispieltypen einfügen
    await Type.bulkCreate([
      //Autotypen (categoryId: 1)
      { name: 'Limousine', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cabriolet', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kombi', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sportwagen', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kleinwagen', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Van', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pick-up', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Elektroauto', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Geländewagen', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },

      //Motorradtypen (categoryId: 2)
      { name: 'Sport', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Naked Bike', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chopper', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tourer', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Enduro', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Motocross', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Supermoto', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Roller', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Elektroroller', categoryId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Types');
  }
};
