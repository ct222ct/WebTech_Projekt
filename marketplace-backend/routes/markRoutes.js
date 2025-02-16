// Importiert das Express-Framework für das Erstellen von Routen
const express = require('express');

// Erstellt eine Router-Instanz für die Marken-Endpunkte
const router = express.Router();

// Importiert das 'Mark'-Modell aus den Datenbankmodellen
const { Mark } = require('../models');


// **1. Endpunkt zum Abrufen aller Marken (GET /marks)**
router.get('/marks', async (req, res) => {
    try {
        // Ruft alle Marken aus der Datenbank ab
        const marks = await Mark.findAll();

        // Debugging: Gibt die abgerufenen Marken in der Konsole aus
        // console.log('Marken:', marks);

        // Antwortet mit der Liste der Marken als JSON
        res.json(marks);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Laden der Marken:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});


// **2. Endpunkt zum Abrufen aller Marken einer bestimmten Kategorie (GET /:categoryId)**
router.get('/:categoryId', async (req, res) => {
    try {
        // Ruft alle Marken ab, die zu einer bestimmten Kategorie gehören
        const marks = await Mark.findAll({
            where: { categoryId: req.params.categoryId }
        });

        // Antwortet mit der Liste der Marken für die angegebene Kategorie
        res.json(marks);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Marken:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
    }
});


// **3. Endpunkt zum Abrufen einer einzelnen Marke anhand der ID (GET /id/:id)**
router.get('/id/:id', async (req, res) => {
    try {
        // Sucht die Marke anhand der übergebenen ID
        const mark = await Mark.findByPk(req.params.id);

        // Falls die Marke nicht gefunden wird, sende eine 404-Fehlermeldung
        if (!mark) {
            return res.status(404).json({ error: 'Marke nicht gefunden' });
        }

        // Antwortet mit dem Namen der Marke
        res.json(mark.name);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Marke:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Marke' });
    }
});

// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
