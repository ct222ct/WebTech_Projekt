const { Category, Mark, Model, Type } = require('../models');

(async () => {
    // Categories
    const cars = await Category.create({ name: 'Cars' });
    const motorbikes = await Category.create({ name: 'Motorbikes' });

    // Marks
    const audi = await Mark.create({ name: 'Audi', categoryId: cars.id });
    const harley = await Mark.create({ name: 'Harley-Davidson', categoryId: motorbikes.id });

    // Models
    const aClass = await Model.create({ name: 'A-Class', markId: audi.id });
    const cClass = await Model.create({ name: 'C-Class', markId: audi.id });

    // Types
    const limousine = await Type.create({ name: 'Limousine', categoryId: cars.id });
    const sportsCar = await Type.create({ name: 'Sports Car', categoryId: cars.id });

    // Associate Models and Types
    await aClass.addType(limousine);
    await cClass.addType(sportsCar);
})();
