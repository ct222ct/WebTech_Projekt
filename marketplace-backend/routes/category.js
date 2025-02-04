const express = require('express');
const router = express.Router();
const { Category, Mark } = require('../models');

// Fetch all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch marks for a category
router.get('/:id/marks', async (req, res) => {
    try {
        const marks = await Mark.findAll({ where: { categoryId: req.params.id } });
        res.json(marks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
