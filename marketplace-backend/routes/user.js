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
    const { email, password, address } = req.body;

    // Validierung: Überprüfen, ob alle Felder ausgefüllt sind
    if (!email || !password || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Überprüfen, ob die E-Mail bereits existiert
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email address is already registered' });
        }

        // Benutzer erstellen
        const user = await User.create({ email, password, address });
        res.status(201).json({ message: 'User registered successfully', user: user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
});


// Benutzerprofil abrufen
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: ['email', 'address'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Benutzerprofil aktualisieren
router.put('/profile', authMiddleware, async (req, res) => {
    const { email, address, password } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (address) user.address = address;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login-Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login-Anfrage erhalten:', { email, password });

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Benutzer suchen
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Passwort prüfen
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // JWT-Token erstellen
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
});


module.exports = router;
