'use strict';

const { Mark, Model } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Models', Model.rawAttributes);

    // Hole alle Marken
    const marks = await Mark.findAll();
    const mercedes = marks.find((mark) => mark.name === 'Mercedes-Benz');
    const bmw = marks.find((mark) => mark.name === 'BMW');
    const yamaha = marks.find((mark) => mark.name === 'Yamaha');

    // Beispielmodelle einfügen
    if (mercedes && bmw && yamaha) {
      await Model.bulkCreate([
        { name: 'C-Class', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },
        { name: '3 Series', markId: bmw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'R1', markId: yamaha.id, createdAt: new Date(), updatedAt: new Date() },
      ]);
    } else {
      console.error('Fehler: Eine oder mehrere Marken wurden nicht gefunden.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Models');
  },
};
