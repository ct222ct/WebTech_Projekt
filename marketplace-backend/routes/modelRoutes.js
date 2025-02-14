const express = require('express');
const router = express.Router();
const { Model } = require('../models');

// Alle Modelle abrufen
router.get('/', async (req, res) => {
    try {
        const models = await Model.findAll();
        res.json(models);
    } catch (error) {
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});
// Modelle nach Marke abrufen
router.get('/:markId', async (req, res) => {
    try {
        const models = await Model.findAll({ where: { markId: req.params.markId } });
        res.json(models);
    } catch (error) {
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});
/*
// Modelle nach Marke abrufen
router.get('/marks/:markId/models', async (req, res) => {
    try {
        const models = await Model.findAll({ where: { markId: req.params.markId } });
        res.json(models);
    } catch (error) {
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});

 */


module.exports = router;
