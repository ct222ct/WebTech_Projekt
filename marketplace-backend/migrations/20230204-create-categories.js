module.exports = {
    up: async (queryInterface, Sequelize) => {
        const categories = await queryInterface.sequelize.query(
            'SELECT name FROM "Categories";'
        );

        const existingCategories = categories[0].map((category) => category.name);

        const newCategories = [
            { name: 'Cars', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Motorbikes', createdAt: new Date(), updatedAt: new Date() },
        ].filter((category) => !existingCategories.includes(category.name));

        if (newCategories.length > 0) {
            await queryInterface.bulkInsert('Categories', newCategories);
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
