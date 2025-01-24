const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); // Stelle sicher, dass Sequelize importiert wird
const sequelize = require('../config/database'); // Importiere die Sequelize-Instanz
const basename = path.basename(__filename);
const db = {};

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Modell-Assoziationen initialisieren
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
