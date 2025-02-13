const { Vehicle } = require('../models'); // Importieren des Modells
const { VehiclePicture } = require('../models'); // Importieren des Modells
const { User } = require('../models/user');


const getVehiclesByType = async (req, res) => {
    try {
        const { typeId } = req.params; // typeId aus der Anfrage
        const { sold } = req.query; // sold aus der Anfrage

        const vehicles = await Vehicle.findAll({
            where: {
                typeId: typeId,
                sold: false, // Exclude sold vehicles
            },
        });

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

const addVehicle = async (req, res) => {
    try {
        const { name, modelId, typeId, description, price, dateOfFirstRegistration, mileage, fuelType, color, condition } = req.body;

        // 🚨 Benutzer-ID aus Token holen
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        console.log('🚗 Fahrzeugdaten:', req.body);
        console.log('🔑 Benutzer-ID:', userId);

        const vehicle = await Vehicle.create({
            name,
            modelId,
            typeId,
            description,
            price,
            dateOfFirstRegistration,
            mileage,
            fuelType,
            color,
            condition,
            userId, // Benutzer-ID setzen
        });

        res.status(201).json(vehicle);
    } catch (error) {
        console.error('❌ Fehler beim Speichern des Fahrzeugs:', error);
        res.status(500).json({ message: 'Fehler beim Speichern des Fahrzeugs.' });
    }
};





const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            modelId,
            typeId,
            description,
            price,
            dateOfFirstRegistration,
            mileage,
            fuelType,
            color,
            condition
        } = req.body;

        console.log(`🔄 Fahrzeug-Update gestartet für ID: ${id}`);

        // 🚨 Prüfen, ob das Token korrekt übermittelt wurde
        if (!req.user || !req.user.id) {
            console.error('❌ Benutzer-ID fehlt im Token!');
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        const userId = req.user.id;
        console.log(`🔑 Benutzer-ID: ${userId}`);

        // Fahrzeug suchen
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
        }

        // Prüfen, ob das Fahrzeug dem angemeldeten Benutzer gehört
        if (vehicle.userId !== userId) {
            return res.status(403).json({ message: 'Nicht berechtigt, dieses Fahrzeug zu bearbeiten' });
        }

        // Fahrzeugdaten aktualisieren
        await vehicle.update({
            name,
            modelId,
            typeId,
            description,
            price,
            dateOfFirstRegistration,
            mileage,
            fuelType,
            color,
            condition
        });

        console.log(`✅ Fahrzeug erfolgreich aktualisiert: ${vehicle.id}`);
        res.json({ message: 'Fahrzeug aktualisiert', vehicle });
    } catch (error) {
        console.error('❌ Fehler beim Aktualisieren des Fahrzeugs:', error);
        res.status(500).json({ message: 'Fehler beim Fahrzeug-Update' });
    }
};


const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Sicherstellen, dass der Benutzer authentifiziert ist
        if (!req.user || !req.user.id) {
            console.error('❌ Kein Benutzer-Token empfangen');
            return res.status(401).json({ message: 'Unauthorized: Kein Benutzer gefunden' });
        }

        console.log('🗑 Fahrzeug löschen mit ID:', id, 'von Benutzer-ID:', req.user.id);

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Fahrzeug nicht gefunden' });
        }

        // 🔹 Überprüfung, ob das Fahrzeug dem Benutzer gehört
        if (vehicle.userId !== req.user.id) {
            console.error('❌ Unberechtigter Löschversuch');
            return res.status(403).json({ message: 'Unberechtigt: Dieses Fahrzeug gehört nicht dir' });
        }

        await vehicle.destroy();
        console.log('✅ Fahrzeug erfolgreich gelöscht:', id);
        res.status(200).json({ message: 'Fahrzeug erfolgreich gelöscht' });
    } catch (error) {
        console.error('❌ Fehler beim Löschen des Fahrzeugs:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Fahrzeugs' });
    }
};


const getSellerListings = async (req, res) => {
    try {
        console.log('Abruf der Fahrzeuge für Benutzer-ID:', req.user.id);

        const vehicles = await Vehicle.findAll({
            where: { userId: req.user.id },
        });

        if (!vehicles.length) {
            console.log('Keine Fahrzeuge gefunden.');
            return res.json([]);
        }

        console.log('Gefundene Fahrzeuge:', vehicles);
        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

const markAsSold = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Ensure only the owner can mark it as sold
        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        vehicle.sold = true;
        await vehicle.save();

        console.log(`Vehicle ${vehicleId} marked as sold `); // Debugging
        res.json({ message: 'Vehicle marked as sold', vehicle });
    } catch (error) {
        console.error('Error marking vehicle as sold:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = { getVehiclesByType, addVehicle, updateVehicle, deleteVehicle, getSellerListings, markAsSold }; // Exportieren der Funktionen