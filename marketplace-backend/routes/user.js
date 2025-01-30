const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authMiddleware = require('../middlewares/auth');

const router = express.
Router();
const JWT_SECRET = '1234'; // Ersetze dies durch eine sicherere Option in der Produktion

// Registrierung
router.post('/register', async (req, res) => {
    const { email, password, name, address } = req.body;

    // Überprüfe, ob alle erforderlichen Felder vorhanden sind
    if (!email || !password || !name || !address) {
        return res.status(400).json({ error: 'Alle Felder (email, password, name, address) sind erforderlich.' });
    }

    try {
        // Überprüfen, ob die E-Mail bereits existiert
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
        }
        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);


        // Benutzer erstellen
        const user = await User.create({
            name,
            address,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
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

        res.json({ name: user.name, email: user.email, address: user.address });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Benutzerdaten', error });
    }
});

// Benutzerprofil aktualisieren
router.put('/user', async (req, res) => {
    try {
        const { userId, name, email, address } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.address = address || user.address;

        await user.save();

        res.json({ message: 'Benutzerdaten erfolgreich aktualisiert', user });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Aktualisieren der Benutzerdaten', error });
    }
});

// Login-Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-Mail und Passwort sind erforderlich.' });
    }

    try {
        // Benutzer in der Datenbank suchen
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Ungültige Anmeldedaten.' });
        }

        // Passwort validieren
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Ungültige Anmeldedaten.' });
        }

        // JWT-Token erstellen
        const token = jwt.sign({ id: user._id, email: user.email }, '1234', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).json({ error: 'Interner Serverfehler.' });
    }
});

// Konto löschen
router.delete('/user', async (req, res) => {
    try {
        const { userId } = req.body;

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


module.exports = router;
