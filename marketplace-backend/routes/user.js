// Importiert erforderliche Module
const express = require('express');
const bcrypt = require('bcrypt'); // Bibliothek zur sicheren Passwortverschlüsselung
const jwt = require('jsonwebtoken'); // JWT für die Authentifizierung
const { User } = require('../models'); // Importiert das User-Modell aus der Datenbank
const authMiddleware = require('../middlewares/auth'); // Middleware zur Authentifizierung
const { updateUser, getUser } = require("../controllers/userController"); // Benutzerbezogene Controller

// Erstellt eine neue Router-Instanz von Express
const router = express.Router();

// JWT-Geheimschlüssel aus Umgebungsvariablen abrufen
const JWT_SECRET = process.env.JWT_SECRET; // In der Produktion sollte dies sicher gespeichert werden

// **Benutzerregistrierung (POST /register)**
router.post('/register', async (req, res) => {
    // Extrahiert Benutzerdaten aus der Anfrage
    const { email, password, name, street, city, postalCode } = req.body;

    // Überprüft, ob alle erforderlichen Felder ausgefüllt sind
    if (!email || !password || !name || !street || !city || !postalCode) {
        return res.status(400).json({ error: 'Alle Felder (email, password, name, street, city, postalCode) sind erforderlich.' });
    }

    try {
        // Überprüfen, ob die E-Mail bereits registriert ist
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'E-Mail-Adresse ist bereits registriert' });
        }

        // Benutzer erstellen
        const user = await User.create({
            name,
            email,
            password,
            street,
            city,
            postalCode
        });

        // Speichert den Benutzer in der Datenbank
        await user.save();
        res.status(201).json({ message: 'Benutzer erfolgreich registriert', user });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).json({ message: 'Interner Serverfehler.', error: error.message });
    }
});

// **Benutzerprofil mit ID abrufen (GET /user/:userId)**
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Benutzer-ID aus der URL extrahieren
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        // Antwortet mit den Benutzerdaten (ohne Passwort)
        res.json({
            name: user.name,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode
        });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Benutzerdaten', error });
    }
});

// **Benutzerprofil aktualisieren (PUT /update)**
router.put('/update', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Benutzer-ID aus dem Token holen
        const { name, email, street, city, postalCode } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        // Aktualisiert die Benutzerdaten
        user.name = name || user.name;
        user.email = email || user.email;
        user.street = street || user.street;
        user.city = city || user.city;
        user.postalCode = postalCode || user.postalCode;

        await user.save();
        res.json({ message: 'Benutzerdaten erfolgreich aktualisiert', user });
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// **Benutzer-Login (POST /login)**
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Überprüft, ob E-Mail und Passwort übermittelt wurden
    if (!email || !password) {
        return res.status(400).json({ error: 'E-Mail und Passwort sind erforderlich.' });
    }

    try {
        // Sucht den Benutzer anhand der E-Mail
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Ungültige Anmeldedaten (E-Mail).' });
        }

        // Überprüft, ob das eingegebene Passwort korrekt ist
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Ungültige Anmeldedaten (Passwort).' });
        }

        // Erstellt ein JWT-Token für die Benutzerauthentifizierung
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token läuft nach 1 Stunde ab
        });

        res.json({ token });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).json({ error: 'Interner Serverfehler.' });
    }
});

// **Benutzer löschen (DELETE /user)**
router.delete('/user', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Benutzer-ID aus Token holen
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        await user.destroy();
        res.json({ message: 'Benutzerkonto erfolgreich gelöscht' });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Löschen des Benutzerkontos', error });
    }
});

// **Daten des eingeloggten Benutzers abrufen (GET /me)**
router.get('/me', authMiddleware, getUser);

// **Daten des eingeloggten Benutzers aktualisieren (PUT /me)**
router.put('/me', authMiddleware, updateUser);

module.exports = router;
