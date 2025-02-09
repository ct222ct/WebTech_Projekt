const { Vehicle } = require('../models'); // Importieren des Modells

const getVehiclesByType = async (req, res) => {
    try {
        const { typeId } = req.params; // typeId aus der Anfrage
        console.log('Angeforderte typeId:', typeId);

        const vehicles = await Vehicle.findAll({ where: { typeId } }); // Abfrage der Daten
        console.log('Gefundene Fahrzeuge:', vehicles);

        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'Keine Fahrzeuge gefunden.' });
        }

        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};

module.exports = { getVehiclesByType };
