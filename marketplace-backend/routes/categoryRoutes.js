const express = require('express');
const router = express.Router();
const { Category, Type, Mark } = require('../models');

// Alle Kategorien abrufen
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Kategorien', error });
    }
});

// Typen einer Kategorie abrufen
router.get('/:id/types', async (req, res) => {
    try {
        const types = await Type.findAll({ where: { categoryId: req.params.id } });
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Typen', error });
    }
});

// Marken einer Kategorie abrufen
router.get('/:id/marks', async (req, res) => {
    try {
        const marks = await Mark.findAll({ where: { categoryId: req.params.id } });
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Marken', error });
    }
});

module.exports = router;
