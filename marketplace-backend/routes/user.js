const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Ersetze dies durch eine sicherere Option in der Produktion

// Registrierung
router.post('/register', async (req, res) => {
    const { email, password, address } = req.body;

    try {
        // Überprüfen, ob der Benutzer bereits existiert
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Benutzer erstellen
        const newUser = await User.create({
            email,
            password: hashedPassword,
            address,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

module.exports = router;
