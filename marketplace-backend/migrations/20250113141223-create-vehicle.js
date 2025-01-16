'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      modelId: {
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      description: {
        type: Sequelize.TEXT
      },
      registrationDate: {
        type: Sequelize.DATE
      },
      mileage: {
        type: Sequelize.INTEGER
      },
      fuel: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehicles');
  }
};