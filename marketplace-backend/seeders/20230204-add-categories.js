module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { name: 'Cars', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Motorbikes', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
