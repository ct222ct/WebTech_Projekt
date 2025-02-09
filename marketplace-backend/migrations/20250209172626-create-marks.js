'use strict';

const { Mark, Category } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Marks', Mark.rawAttributes);

    // Finde die IDs der Kategorien
    const categories = await Category.findAll();
    const autoCategory = categories.find((cat) => cat.name === 'Auto');
    const motorradCategory = categories.find((cat) => cat.name === 'Motorrad');

    // Beispielmarken einfügen, die mit den Kategorien verknüpft sind
    await Mark.bulkCreate([
      { name: 'Mercedes-Benz', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'BMW', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yamaha', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Marks');
    await queryInterface.removeConstraint('Marks', 'Marks_categoryId_fkey').catch(err => {
      console.warn('Constraint Marks_categoryId_fkey nicht gefunden. Überspringe das Entfernen.');
    });
  }
};
