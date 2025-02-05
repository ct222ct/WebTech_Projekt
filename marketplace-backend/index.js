const express = require('express');
const { sequelize, User } = require('./models'); // User aus models importieren
const app = express();
const dotenv = require('dotenv');
// CORS-Middleware aktivieren
const cors = require('cors');
const userRoutes = require('./routes/user');
const {json} = require("express");
const categoryRoutes = require('./routes/categoryRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

// .env-Konfiguration laden
dotenv.config();
// CORS-Middleware aktivieren
app.use(cors()); // CORS-Middleware aktivieren
// Middleware
app.use(json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelize.sync({ alter: true });
// Benutzer-Routen registrieren
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); // Endpunkte für Kategorien
app.use('/api/vehicles', vehicleRoutes);   // Endpunkte für Fahrzeuge

app.post('/api/users/register', async (req, res) => {
    const { email, password, address } = req.body;

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

// Datenbank synchronisieren
sequelize
    .sync({ alter: true }) // Ändert die Tabellen, falls notwendig
    .then(() => console.log('Datenbanktabellen synchronisiert'))
    .catch((err) => console.error('Fehler beim Synchronisieren der Datenbank:', err));

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));