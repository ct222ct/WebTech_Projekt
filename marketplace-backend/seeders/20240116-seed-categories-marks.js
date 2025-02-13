module.exports = {
    up: async (queryInterface, Sequelize) => {
        const categories = await queryInterface.sequelize.query(
            'SELECT id FROM "Categories";'
        );

        const categoryId = categories[0][0].id;

        await queryInterface.bulkInsert('Marks', [
            { name: 'Audi', categoryId, createdAt: new Date(), updatedAt: new Date() },
            { name: 'BMW', categoryId, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Marks', null, {});
    },
};
