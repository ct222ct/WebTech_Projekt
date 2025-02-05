const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = require('../config/database'); // Importiere die DB-Instanz
const db = {};
const Category = require('./category');

fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        console.log(`Lade Modell: ${file}`); // Debugging
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });


// Initialisiere Assoziationen
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        console.log(`Initialisiere Assoziation für ${modelName}`); // Debugging
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Kategorien automatisch hinzufügen
(async () => {
    try {
        await sequelize.sync({ alter: true });// Synchronisiere die Modelle mit der Datenbank
        const Category = db.Category;

        // Überprüfen und hinzufügen
        const categories = ['Cars', 'Motorbikes'];
        for (const categoryName of categories) {
            const [category, created] = await Category.findOrCreate({
                where: { name: categoryName },
                defaults: { name: categoryName },
            });

            if (created) {
                console.log(`Kategorie hinzugefügt: ${categoryName}`);
            } else {
                console.log(`Kategorie existiert bereits: ${categoryName}`);
            }
        }
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Kategorien:', error);
    }
})();

module.exports = db;