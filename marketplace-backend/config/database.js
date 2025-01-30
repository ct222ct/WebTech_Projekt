const { Sequelize } = require('sequelize');

// Verbindung zur Datenbank herstellen
const sequelize = new Sequelize('marketplace', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres', // Ersetze dies durch den genutzten Dialekt (z. B. mysql, sqlite)
    logging: true, // Optional: Deaktiviert SQL-Logging
});

sequelize
    .authenticate()
    .then(() => console.log('Verbindung zur Datenbank erfolgreich hergestellt'))
    .catch((err) => console.error('Fehler bei der Verbindung zur Datenbank:', err));

module.exports = sequelize;
