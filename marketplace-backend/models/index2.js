// Import der Sequelize-Klasse
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('marketplace', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', // Ersetze 'postgres' durch den Dialekt deiner Wahl (z.B. 'mysql', 'sqlite', etc.)
    logging: false, // Optional: Deaktiviert SQL-Logs
});

module.exports = sequelize;

