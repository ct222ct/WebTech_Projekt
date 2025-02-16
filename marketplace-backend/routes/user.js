const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authMiddleware = require('../middlewares/auth');
const {updateUser, getUser} = require("../controllers/userController");

const router = express.
Router();
const JWT_SECRET = '1234'; // Ersetze dies durch eine sicherere Option in der Produktion

// Registrierung
router.post('/register', async (req, res) => {
    const { email, password, name, street, city, postalCode } = req.body;

    // Überprüfe, ob alle erforderlichen Felder vorhanden sind
    if (!email || !password || !name || !street || !city || !postalCode) {
        return res.status(400).json({ error: 'Alle Felder (email, password, name, street, city, postalCode) sind erforderlich.' });
    }

    try {
        // Überprüfen, ob die E-Mail bereits existiert
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
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

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: user });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).json({ message: 'Interner Serverfehler.', error: error.message });
    }
});


// Benutzerprofil abrufen
router.get('/user', async (req, res) => {
    try {
        const { userId } = req.query; // Benutzer-ID aus der Anfrage
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        res.json({
            name: user.name,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode});
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Benutzerdaten', error });
    }
});

// Benutzerprofil aktualisieren
router.put('/update',authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Holt Benutzer-ID aus dem Token
        const { name, email, street, city, postalCode } = req.body;

        console.log('Benutzer-ID:', userId);

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

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


// Login-Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('E-Mail:', email);
    console.log('Eingegebenes Passwort:', password);

    if (!email || !password) {
        return res.status(400).json({ error: 'E-Mail und Passwort sind erforderlich.' });
    }

    try {
        // Benutzer in der Datenbank suchen
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('Benutzer nicht gefunden.');
            return res.status(401).json({ error: 'Ungültige Anmeldedaten (E-Mail).' });
        }

        // Passwort validieren
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log('Passwort gültig:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Ungültige Anmeldedaten (Passwort).' });
        }

        // JWT-Token erstellen
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('Token:', token);

        res.json({ token });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).json({ error: 'Interner Serverfehler.' });
    }
});

//Benutzer löschen
router.delete('/user', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
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


// Hol die Daten des eingeloggten Benutzers
router.get('/me', authMiddleware, getUser);

// Aktualisiere die Daten des eingeloggten Benutzers
router.put('/me', authMiddleware, updateUser);


module.exports = router;
