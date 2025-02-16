const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = require('../config/database'); // Importiere die DB-Instanz
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        //console.log(`Lade Modell: ${file}`); // Debugging
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Initialisiere Assoziationen
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
       // console.log(`Initialisiere Assoziation für ${modelName}`); // Debugging
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Kategorien automatisch hinzufügen
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Datenbankverbindung hergestellt.');

    } catch (error) {
        console.error('Fehler beim Initialisieren der Datenbank:', error);
    }
})();

module.exports = db;
