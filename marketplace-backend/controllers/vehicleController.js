const { Vehicle } = require('../models');

const getVehiclesByCategory = async (req, res) => {
    try {
        console.log('API wurde aufgerufen:', req.query);

        // Überprüfen, ob die Kategorie-ID übergeben wurde
        const { categoryId } = req.query;
        if (!categoryId) {
            return res.status(400).json({ message: 'Kategorie-ID fehlt in der Anfrage.' });
        }

        // Abrufen der Fahrzeuge aus der Datenbank
        const vehicles = await Vehicle.findAll({
            where: { categoryId },
            include: [{ model: Category, as: 'category' }], // Optional: Kategorie einbinden
        });

        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'Keine Fahrzeuge in dieser Kategorie gefunden.' });
        }

        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};


module.exports = { getVehiclesByCategory };
