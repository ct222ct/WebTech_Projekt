const express = require('express');
const router = express.Router();
const { Mark } = require('../models');

// Endpunkt, um alle Marken abzurufen
router.get('/marks', async (req, res) => {
    try {
        const marks = await Mark.findAll();
        console.log('Marken:', marks);
        res.json(marks);
    } catch (error) {
        console.error('Fehler beim Laden der Marken:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

module.exports = router;
