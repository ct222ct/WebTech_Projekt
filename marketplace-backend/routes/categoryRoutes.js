// Importiert das Express-Framework für das Erstellen von Routen
const express = require('express');

// Erstellt eine Router-Instanz für die Kategoriefunktionen
const router = express.Router();

// Importiert die Modelle 'Category', 'Type' und 'Mark' aus dem '../models' Verzeichnis
const { Category, Type, Mark } = require('../models');

// Importiert den Controller für Kategorien
const categoryController = require('../controllers/categoryController');


// **1. Alle Kategorien abrufen (GET /categories)**
router.get('/', async (req, res) => {
    try {
        // Holt alle Kategorien aus der Datenbank
        const categories = await Category.findAll();

        // Antwort mit den abgerufenen Kategorien
        res.json(categories);
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Fehler beim Abrufen der Kategorien', error });
    }
});


// **2. Alle Typen einer bestimmten Kategorie abrufen (GET /categories/:id/types)**
router.get('/:id/types', async (req, res) => {
    try {
        // Holt alle Typen, die zur angegebenen Kategorie gehören
        const types = await Type.findAll({ where: { categoryId: req.params.id } });

        // Antwort mit den abgerufenen Typen
        res.json(types);
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Fehler beim Abrufen der Typen', error });
    }
});


// **3. Alle Marken einer bestimmten Kategorie abrufen (GET /categories/:id/marks)**
router.get('/:id/marks', async (req, res) => {
    try {
        // Holt alle Marken, die zur angegebenen Kategorie gehören
        const marks = await Mark.findAll({ where: { categoryId: req.params.id } });

        // Antwort mit den abgerufenen Marken
        res.json(marks);
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Fehler beim Abrufen der Marken', error });
    }
});


// **4. Alle Marken einer bestimmten Kategorie abrufen (nur für Autos - Kategorie ID 1)**
router.get('/1/marks', async (req, res) => {
    try {
        // Holt alle Marken der Kategorie mit der ID 1 (Autos)
        const marks = await Mark.findAll({ where: { categoryId: 1 } });

        // Antwort mit den abgerufenen Marken
        res.json(marks);
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Fehler beim Abrufen der Marken', error });
    }
});


// **5. Alle Marken einer bestimmten Kategorie abrufen (nur für Motorräder - Kategorie ID 2)**
router.get('/2/marks', async (req, res) => {
    try {
        // Holt alle Marken der Kategorie mit der ID 2 (Motorräder)
        const marks = await Mark.findAll({ where: { categoryId: 2 } });

        // Antwort mit den abgerufenen Marken
        res.json(marks);
    } catch (error) {
        // Fehlerbehandlung
        res.status(500).json({ message: 'Fehler beim Abrufen der Marken', error });
    }
});


// **6. Eine spezifische Kategorie mit Details abrufen (GET /categories/:id)**
router.get('/:id', categoryController.getCategoryDetails);


// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
