const { Vehicle } = require('../models'); // Importiere nur das benötigte Modell

const getVehiclesByCategory = async (req, res) => {
    try {
        console.log("API wurde aufgerufen mit Query:", req.query); // Debugging
        const { categoryId } = req.query;

        // Validierung der Anfrage
        if (!categoryId) {
            console.error("Kategorie-ID fehlt in der Anfrage.");
            return res.status(400).json({ message: "Kategorie-ID ist erforderlich" });
        }

        // Abrufen der Fahrzeuge für die Kategorie
        const vehicles = await Vehicle.findAll({
            where: { categoryId }, // Überprüft nur die Kategorie-ID
        });

        console.log("Gefundene Fahrzeuge:", vehicles); // Debugging
        return res.json(vehicles);
    } catch (error) {
        console.error("Fehler beim Abrufen der Fahrzeuge:", error); // Debugging
        return res.status(500).json({ message: "Interner Serverfehler" });
    }
};

module.exports = { getVehiclesByCategory };
