const { Category, Mark } = require('../models'); // Modelle importieren

// API-Endpunkt: Kategorie mit Details abrufen
exports.getCategoryDetails = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Kategorie und zugehörige Marken abrufen
        const category = await Category.findByPk(categoryId, {
            include: [{ model: Mark, as: 'categoryMarks' }]
        });

        if (!category) {
            return res.status(404).json({ message: 'Kategorie nicht gefunden' });
        }

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};
