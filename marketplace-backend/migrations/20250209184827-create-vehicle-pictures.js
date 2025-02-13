'use strict';

const {VehiclePicture} = require("../models");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VehiclePicture', VehiclePicture.rawAttributes);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VehiclePicture');
  },
};
