const { Vehicle } = require('../models'); // Importieren des Modells
const { VehiclePicture } = require('../models'); // Importieren des Modells
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

const addVehicle = async (req, res) => {
    try {
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
            categoryId,
        } = req.body;

        const vehicle = await Vehicle.create({
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
            categoryId,
        });

        // Save uploaded pictures
        const pictureUrls = req.files.map((file) => `/uploads/${file.filename}`);
        for (const url of pictureUrls) {
            await VehiclePicture.create({ vehicleId: vehicle.id, url });
        }

        res.status(201).json(vehicle);
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).json({ error: 'Error adding vehicle' });
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
            categoryId,
        } = req.body;

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
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
            categoryId,
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
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
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
        const userId = req.query.userId; // Get userId from query parameter

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const listings = await Vehicle.findAll({
            where: { userId },
            include: [{ model: VehiclePicture, as: 'pictures' }],
        });

        res.json(listings);
    } catch (error) {
        console.error('Error fetching seller listings:', error);
        res.status(500).json({ error: 'Error fetching seller listings' });
    }
};


const markAsSold = async (req, res) => {
    try {
        const { id } = req.params; // Extract vehicle ID from the URL

        // Find the vehicle by ID
        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Update the vehicle's status to 'sold'
        vehicle.status = 'sold';
        await vehicle.save();

        res.json(vehicle); // Respond with the updated vehicle
    } catch (error) {
        console.error('Error marking vehicle as sold:', error);
        res.status(500).json({ error: 'Error marking vehicle as sold' });
    }
};





module.exports = { getVehiclesByType, addVehicle, updateVehicle, deleteVehicle, getSellerListings, markAsSold }; // Exportieren der Funktionen