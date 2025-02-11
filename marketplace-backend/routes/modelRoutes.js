const express = require('express');
const router = express.Router();
const { Model } = require('../models');  // Dein Sequelize Model für Fahrzeuge

// 📌 GET: Alle Fahrzeugmodelle abrufen
router.get('/', async (req, res) => {
    try {
        const models = await Model.findAll();
        res.json(models);
    } catch (error) {
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});

module.exports = router;
