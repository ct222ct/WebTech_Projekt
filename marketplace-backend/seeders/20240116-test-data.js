const { Category, VehicleType } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const cars = await Category.findOne({ where: { name: 'Cars' } });

        if (!cars) {
            throw new Error('Category "Cars" not found!');
        }

        await VehicleType.create({
            name: 'SUV',
            categoryId: cars.id,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('VehicleTypes', null, {});
    },
};
