const express = require('express');
const bodyParser = require('body-parser'); // Falls du body-parser nutzt
const vehicleRoutes = require('./routes/vehicle'); // Importiere das Fahrzeug-Routenmodul
const messageRoutes = require('./routes/message'); // Beispiel für ein anderes Modul
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // Middleware für JSON-Parsing
app.use(bodyParser.urlencoded({ extended: true })); // Falls benötigt

// Verwende die importierten Routenmodule
app.use('/api/vehicles', vehicleRoutes); // Fahrzeug-Routen
app.use('/api/messages', messageRoutes); // Nachrichten-Routen (falls vorhanden)
app.use('/api/auth', authRoutes);
app.use(errorHandler);


// Standard-Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});


const sequelize = require('./models/index2'); // Verweis auf index2.js
const Category = require('./models/vehicle/category'); // Verweis auf category.js

(async () => {
    try {
        // Verbindung testen
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Datenbank synchronisieren
        await sequelize.sync({ force: true }); // Achtung: Alle Tabellen werden gelöscht und neu erstellt
        console.log('Database synchronized.');

        // Testeintrag erstellen
        const newCategory = await Category.create({ name: 'Test Category' });
        console.log('Category created:', newCategory);

        // Alle Kategorien abrufen
        const categories = await Category.findAll();
        console.log('Categories:', categories);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();
