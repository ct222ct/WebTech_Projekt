'use strict';

const { Vehicle } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', Vehicle.rawAttributes);

    // Beispiel-Fahrzeuge einfügen
    await Vehicle.bulkCreate([
      {
        name: 'Mercedes-Benz C-Class',
        description: 'Eine luxuriöse Limousine.',
        price: 45000,
        userId: 1,
        categoryId: 1,
        markId: 1,
        modelId: 1,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'BMW 3 Series',
        description: 'Eine elegante Mittelklasse-Limousine.',
        price: 50000,
        userId: 1,
        categoryId: 1,
        markId: 2,
        modelId: 2,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  }
};
