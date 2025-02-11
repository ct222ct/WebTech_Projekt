const express = require('express');
const router = express.Router();
const { Type } = require('../models');  // Dein Sequelize Model für Fahrzeugtypen

// 📌 GET: Alle Fahrzeugtypen abrufen
router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll();
        res.json(types);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeugtypen:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Fahrzeugtypen' });
    }
});

module.exports = router;
