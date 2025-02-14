'use strict';

const { Mark, Model } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Models', Model.rawAttributes);

    // Hole alle Marken
    const marks = await Mark.findAll();
    const mercedes = marks.find((mark) => mark.name === 'Mercedes-Benz');
    const bmw = marks.find((mark) => mark.name === 'BMW');
    const audi = marks.find((mark) => mark.name === 'Audi');
    const vw = marks.find((mark) => mark.name === 'Volkswagen');
    const toyota = marks.find((mark) => mark.name === 'Toyota');
    const ford = marks.find((mark) => mark.name === 'Ford');
    const tesla = marks.find((mark) => mark.name === 'Tesla');
    const yamaha = marks.find((mark) => mark.name === 'Yamaha');
    const kawasaki = marks.find((mark) => mark.name === 'Kawasaki');
    const ducati = marks.find((mark) => mark.name === 'Ducati');
    const harley = marks.find((mark) => mark.name === 'Harley-Davidson');
    const suzuki = marks.find((mark) => mark.name === 'Suzuki');

    if (mercedes && bmw && audi && vw && toyota && ford && tesla && yamaha && kawasaki && ducati && harley && suzuki) {
      await Model.bulkCreate([
        // Mercedes-Benz Modelle
        { name: 'C-Class', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'E-Class', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'S-Class', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'GLC', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'GLE', markId: mercedes.id, createdAt: new Date(), updatedAt: new Date() },

        // BMW Modelle
        { name: '3 Series', markId: bmw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: '5 Series', markId: bmw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'X3', markId: bmw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'X5', markId: bmw.id, createdAt: new Date(), updatedAt: new Date() },

        // Audi Modelle
        { name: 'A3', markId: audi.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'A4', markId: audi.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Q5', markId: audi.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Q7', markId: audi.id, createdAt: new Date(), updatedAt: new Date() },

        // Volkswagen Modelle
        { name: 'Golf', markId: vw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Passat', markId: vw.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Tiguan', markId: vw.id, createdAt: new Date(), updatedAt: new Date() },

        // Toyota Modelle
        { name: 'Corolla', markId: toyota.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Camry', markId: toyota.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'RAV4', markId: toyota.id, createdAt: new Date(), updatedAt: new Date() },

        // Ford Modelle
        { name: 'Focus', markId: ford.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Mustang', markId: ford.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Explorer', markId: ford.id, createdAt: new Date(), updatedAt: new Date() },

        // Tesla Modelle
        { name: 'Model S', markId: tesla.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Model 3', markId: tesla.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Model X', markId: tesla.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Model Y', markId: tesla.id, createdAt: new Date(), updatedAt: new Date() },

        // Yamaha Modelle
        { name: 'R1', markId: yamaha.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'MT-07', markId: yamaha.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'XSR900', markId: yamaha.id, createdAt: new Date(), updatedAt: new Date() },

        // Kawasaki Modelle
        { name: 'Ninja 400', markId: kawasaki.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Z900', markId: kawasaki.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Versys 650', markId: kawasaki.id, createdAt: new Date(), updatedAt: new Date() },

        // Ducati Modelle
        { name: 'Panigale V4', markId: ducati.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Monster 821', markId: ducati.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Multistrada 950', markId: ducati.id, createdAt: new Date(), updatedAt: new Date() },

        // Harley-Davidson Modelle
        { name: 'Sportster S', markId: harley.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Fat Boy', markId: harley.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Street Glide', markId: harley.id, createdAt: new Date(), updatedAt: new Date() },

        // Suzuki Modelle
        { name: 'GSX-R1000', markId: suzuki.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'V-Strom 650', markId: suzuki.id, createdAt: new Date(), updatedAt: new Date() },
        { name: 'Katana', markId: suzuki.id, createdAt: new Date(), updatedAt: new Date() },
      ]);

    } else {
      console.error('Fehler: Eine oder mehrere Marken wurden nicht gefunden.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Models');
  },
};
