const { User, Vehicle, Category, Mark, Model, VehicleType } = require('../models/index2');

module.exports = {
    async up(queryInterface) {
        const cars = await Category.findOne({ where: { name: 'Cars' } });
        const motorbikes = await Category.findOne({ where: { name: 'Motorbikes' } });

        const audi = await Mark.findOne({ where: { name: 'Audi' } });
        const mercedes = await Mark.findOne({ where: { name: 'Mercedes-Benz' } });

        const aClass = await Model.findOne({ where: { name: 'A-Class' } });
        const suv = await VehicleType.findOne({ where: { name: 'SUV' } });

        const user = await User.create({
            email: 'testuser@example.com',
            password: '$2b$10$7sbL0HdnvcwXaFq/Uw4wiuWdI6PlG7ZoFIW9A3AHeH8B/PI6Z4c5e', // Passwort: "password"
            name: 'Test User',
        });

        await Vehicle.create({
            name: 'Audi Q5',
            description: 'A great SUV for your family!',
            price: 30000,
            registrationDate: new Date('2018-01-01'),
            mileage: 50000,
            fuelType: 'Diesel',
            color: 'Black',
            condition: 'used',
            modelId: aClass.id,
            typeId: suv.id,
            sellerId: user.id,
        });
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Vehicles', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    },
};
