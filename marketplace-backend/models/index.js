//index.js
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
        await sequelize.sync({ alter: true }); // Tabellenstruktur anpassen
        console.log('Datenbank wurde erfolgreich synchronisiert.');
        const Category = db.Category;
        const Mark = db.Mark;
        const Model = db.Model;


        // Überprüfen und hinzufügen
        const categories = ['Cars', 'Motorbikes'];
        for (const categoryName of categories) {
            const [category] = await Category.findOrCreate({
                where: { name: categoryName },
                defaults: { name: categoryName },
            });
            console.log(`Kategorie hinzugefügt oder existiert bereits: ${categoryName}`);

            // Marken für Autos
            if (categoryName === 'Cars') {
                const carMarks = ['Audi', 'Mercedes-Benz', 'BMW'];
                for (const markName of carMarks) {
                    const [mark] = await Mark.findOrCreate({
                        where: { name: markName, categoryId: category.id },
                        defaults: { name: markName, categoryId: category.id },
                    });

                    console.log(`Marke hinzugefügt oder existiert bereits: ${markName}`);

                    // Modelle für jede Marke
                    const models = {
                        'Audi': ['A3', 'A4', 'Q5'],
                        'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class'],
                        'BMW': ['X1', 'X3', 'X5'],
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

            // Marken für Motorräder
            if (categoryName === 'Motorbikes') {
                const bikeMarks = ['Harley-Davidson', 'Yamaha', 'Kawasaki'];
                for (const markName of bikeMarks) {
                    const [mark] = await Mark.findOrCreate({
                        where: {name: markName, categoryId: category.id},
                        defaults: {name: markName, categoryId: category.id},
                    });

                    console.log(`Marke hinzugefügt oder existiert bereits: ${markName}`);

                    // Modelle für jede Marke
                    const models = {
                        'Harley-Davidson': ['Street 750', 'Iron 883'],
                        'Yamaha': ['YZF-R3', 'MT-07'],
                        'Kawasaki': ['Ninja 300', 'Z650'],
                    };
                    if (models[markName]) {
                        for (const modelName of models[markName]) {
                            await Model.findOrCreate({
                                where: {name: modelName, markId: mark.id},
                                defaults: {name: modelName, markId: mark.id},
                            });

                            console.log(`Modell hinzugefügt oder existiert bereits: ${modelName}`);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Kategorien:', error);
    }
})();

module.exports = db;