const express = require('express');
const { Sequelize } = require('sequelize');
const routes = require('./routes'); // Stelle sicher, dass dies auf `routes/index.js` verweist

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Beispiel Sequelize-Instanz
const sequelize = new Sequelize('marketplace', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Datenbankverbindung erfolgreich hergestellt.');

        await sequelize.sync({ alter: true });
        console.log('Datenbank synchronisiert.');

        // Routen
        app.use('/api', routes);

        app.listen(PORT, () => {
            console.log(`Server läuft auf Port ${PORT}`);
        });
    } catch (error) {
        console.error('Fehler bei der Initialisierung:', error);
        await sequelize.close();
    }
})();
const cors = require('cors');
app.use(cors()); // CORS-Middleware aktivieren

const User = require('./models/user'); // Beispiel: Benutzer-Modell

app.post('/api/users/register', async (req, res) => {
    const { email, password, address } = req.body;

    if (!email || !password || !address) {
        return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
    }

    try {
        // Benutzer speichern
        const newUser = await User.create({
            email: email,
            password: password,
            address: address,
        });

        res.status(201).json({ message: 'Registrierung erfolgreich!', user: newUser });
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        res.status(500).json({ message: 'Fehler beim Speichern der Registrierung.' });
    }
});
