const { Sequelize } = require('sequelize');

// Verbindung zur Datenbank herstellen
const sequelize = new Sequelize('marketplace', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', // Ersetze dies durch den genutzten Dialekt (z. B. mysql, sqlite)
    logging: true, // Optional: Deaktiviert SQL-Logging
});

module.exports = sequelize;
