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
      //Automarken (categoryId: autoCategory.id)
      { name: 'Mercedes-Benz', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'BMW', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Audi', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Volkswagen', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ford', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyota', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Opel', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Porsche', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tesla', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda', categoryId: autoCategory.id, createdAt: new Date(), updatedAt: new Date() },

      // Motorradmarken (categoryId: motorradCategory.id)
      { name: 'Yamaha', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kawasaki', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ducati', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harley-Davidson', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Suzuki', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'KTM', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Triumph', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'BMW Motorrad', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Aprilia', categoryId: motorradCategory.id, createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Marks');
    await queryInterface.removeConstraint('Marks', 'Marks_categoryId_fkey').catch(err => {
      console.warn('Constraint Marks_categoryId_fkey nicht gefunden. Überspringe das Entfernen.');
    });
  }
};
