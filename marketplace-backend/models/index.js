const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const sequelize = require('../config/database'); // Importiere die DB-Instanz
const db = {};

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
        await sequelize.authenticate();
        console.log('Datenbankverbindung hergestellt.');
        /*
                // Synchronisation der Tabellen
                await sequelize.sync({ alter: true });// Tabellenstruktur aktualisieren, ohne Daten zu löschen
                console.log('Tabellen erfolgrch synchronisiert.');

                // Zusätzliche Initialisierungen
                const Category = db.Category;
                const Mark = db.Mark;
                const Model = db.Model;

                // Kategorien hinzufügen
                const categories = ['Cars', 'Motorbikes'];
                for (const categoryName of categories) {
                    const [category] = await Category.findOrCreate({
                        where: { name: categoryName },
                        defaults: { name: categoryName },
                    });
                    console.log(`Kategorie hinzugefügt oder existiert bereits: ${categoryName}`);

                    // Beispiel-Markierungen und Modelle hinzufügen
                    if (categoryName === 'Cars') {
                        const marks = ['Audi', 'BMW', 'Mercedes-Benz'];
                        for (const markName of marks) {
                            const [mark] = await Mark.findOrCreate({
                                where: { name: markName, categoryId: category.id },
                                defaults: { name: markName, categoryId: category.id },
                            });
                            console.log(`Marke hinzugefügt oder existiert bereits: ${markName}`);

                            const models = {
                                Audi: ['A3', 'A4', 'Q5'],
                                BMW: ['X1', 'X3', 'X5'],
                                'Mercedes-Benz': ['C-Class', 'E-Class'],
                            };

                            if (models[markName]) {
                                for (const modelName of models[markName]) {
                                    await Model.findOrCreate({
                                        where: { name: modelName, markId: mark.id },
                                        defaults: { name: modelName, markId: mark.id },
                                    });
                                    console.log(`Modell hinzugefügt oder existiert bereits: ${modelName}`);
                                }
                            }
                        }
                    }
                }*/
    } catch (error) {
        console.error('Fehler beim Initialisieren der Datenbank:', error);
    }
})();

module.exports = db;
