// Importiert das Express-Framework für die Erstellung von Routen
const express = require('express');

// Erstellt eine Router-Instanz für die Fahrzeugtypen-Endpunkte
const router = express.Router();

// Importiert die Modelle 'Type' und 'Mark' aus den Datenbankmodellen
const { Type, Mark } = require('../models');  // Sequelize-Modelle für Fahrzeugtypen und Marken


// **1. Endpunkt zum Abrufen aller Fahrzeugtypen (GET /api/types)**
router.get('/api/types', async (req, res) => {
    try {
        // Holt alle Fahrzeugtypen aus der Datenbank
        const types = await Type.findAll();

        // Antwortet mit der Liste der Fahrzeugtypen als JSON
        res.json(types);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Fahrzeugtypen:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Fahrzeugtypen' });
    }
});


// **2. Endpunkt zum Abrufen aller Fahrzeugtypen einer bestimmten Kategorie (GET /types/:categoryId)**
router.get('/:categoryId', async (req, res) => {
    try {
        // Holt alle Fahrzeugtypen, die zu einer bestimmten Kategorie gehören
        const types = await Type.findAll({
            where: { categoryId: req.params.categoryId }
        });

        // Antwortet mit der Liste der Fahrzeugtypen für die angegebene Kategorie
        res.json(types);
    } catch (error) {
        // Fehlerbehandlung für Serverfehler
        console.error('Fehler beim Abrufen der Typen:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Typen' });
    }
});

// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
