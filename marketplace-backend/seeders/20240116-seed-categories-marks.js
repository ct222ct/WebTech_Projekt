const { Category, Mark, Model, VehicleType } = require('../models/vehicle');

module.exports = {
    async up(queryInterface) {
        const cars = await Category.create({ name: 'Cars' });
        const motorbikes = await Category.create({ name: 'Motorbikes' });

        const audi = await Mark.create({ name: 'Audi', categoryId: cars.id });
        const mercedes = await Mark.create({ name: 'Mercedes-Benz', categoryId: cars.id });
        const harley = await Mark.create({ name: 'Harley-Davidson', categoryId: motorbikes.id });

        await Model.bulkCreate([
            { name: 'A-Class', markId: mercedes.id },
            { name: 'C-Class', markId: mercedes.id },
            { name: 'Q5', markId: audi.id },
        ]);

        await VehicleType.bulkCreate([
            { name: 'SUV', categoryId: cars.id },
            { name: 'Limousine', categoryId: cars.id },
            { name: 'Sport Bike', categoryId: motorbikes.id },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('VehicleTypes', null, {});
        await queryInterface.bulkDelete('Models', null, {});
        await queryInterface.bulkDelete('Marks', null, {});
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
