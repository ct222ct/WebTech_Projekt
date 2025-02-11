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
            model,
            type,
            description,
            price,
            dateOfFirstRegistration,
            mileage,
            fuelType,
            color,
            condition,
        } = req.body;

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await vehicle.update({
            name,
            model,
            type,
            description,
            price,
            dateOfFirstRegistration,
            mileage,
            fuelType,
            color,
            condition,
        });

        res.json(vehicle);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ error: 'Error updating vehicle' });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await Vehicle.findByPk(id);

        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await vehicle.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ error: 'Error deleting vehicle' });
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