// Importiert das Sequelize-Modul, um mit einer relationalen Datenbank zu arbeiten
const { Sequelize } = require('sequelize');

// Importiert das dotenv-Modul, um Umgebungsvariablen aus einer .env-Datei zu laden
const dotenv = require('dotenv');

// Lädt die Umgebungsvariablen aus der .env-Datei in process.env
dotenv.config();

// Erstellt eine neue Sequelize-Instanz für die Datenbankverbindung
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Datenbankname aus der .env-Datei
    process.env.DB_USER,     // Benutzername aus der .env-Datei
    process.env.DB_PASSWORD, // Passwort aus der .env-Datei
    {
        host: process.env.DB_HOST || 'localhost', // Setzt den Host; wenn nicht definiert, wird 'localhost' verwendet
        dialect: 'postgres',  // Gibt an, dass eine PostgreSQL-Datenbank verwendet wird
        logging: console.log, // Gibt SQL-Abfragen in der Konsole aus (zum Debugging)
    }
);

// Exportiert die erstellte Sequelize-Instanz, damit sie in anderen Dateien verwendet werden kann
module.exports = sequelize;
