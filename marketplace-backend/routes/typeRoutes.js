const express = require('express');
const router = express.Router();
const { Type, Mark} = require('../models');  // Dein Sequelize Model für Fahrzeugtypen

// 📌 GET: Alle Fahrzeugtypen abrufen
router.get('/api/types', async (req, res) => {
    try {
        const types = await Type.findAll();
        res.json(types);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeugtypen:', error);
        res.status(500).json({ error: 'Serverfehler beim Abrufen der Fahrzeugtypen' });
    }
});

router.get('/:categoryId', async (req, res) => {
    try {
        const types = await Type.findAll({where: {categoryId: req.params.categoryId}});
        res.json(types);
    } catch (error) {
        console.error('Fehler beim Abrufen der Typen:', error);
        res.status(500).json({error: 'Serverfehler beim Abrufen der Modelle'});
    }
});


module.exports = router;
