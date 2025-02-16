// Importiert das Express-Framework für die Erstellung von Routen
const express = require('express');

// Erstellt eine Router-Instanz für die Modell-Endpunkte
const router = express.Router();

// Importiert das 'Model'-Modell aus den Datenbankmodellen
const { Model } = require('../models');


// **1. Endpunkt zum Abrufen aller Modelle (GET /models)**
router.get('/', async (req, res) => {
    try {
        // Holt alle Modelle aus der Datenbank
        const models = await Model.findAll();

        // Antwortet mit der Liste der Modelle als JSON
        res.json(models);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});


// **2. Endpunkt zum Abrufen aller Modelle einer bestimmten Marke (GET /models/:markId)**
router.get('/:markId', async (req, res) => {
    try {
        // Holt alle Modelle ab, die zu einer bestimmten Marke gehören
        const models = await Model.findAll({
            where: { markId: req.params.markId }
        });

        // Antwortet mit der Liste der Modelle für die angegebene Marke
        res.json(models);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Modelle:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});


// **3. Endpunkt zum Abrufen eines bestimmten Modells anhand der ID (GET /models/id/:id)**
router.get('/id/:id', async (req, res) => {
    try {
        // Sucht das Modell anhand der übergebenen ID
        const model = await Model.findByPk(req.params.id);

        // Falls das Modell nicht gefunden wird, sende eine 404-Fehlermeldung
        if (!model) {
            return res.status(404).json({ error: 'Modell nicht gefunden' });
        }

        // Antwortet mit dem Namen des Modells
        res.json(model.name);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen des Modells:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen des Modells' });
    }
});

// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
