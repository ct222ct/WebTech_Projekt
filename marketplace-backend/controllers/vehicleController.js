// Importieren der benötigten Module
const { Vehicle, VehiclePictures } = require('../models'); // Datenbank-Modelle
const { Op } = require('sequelize'); // Sequelize-Operatoren für SQL-Abfragen
const path = require('path');
const fs = require('fs');
const multer = require('multer');

/**
 * Holt alle Fahrzeuge einer bestimmten Kategorie
 */
const getVehiclesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // Kategorie-ID aus der Anfrage
        const vehicles = await Vehicle.findAll({
            where: {
                categoryId: categoryId,
                sold: false, // Nur verfügbare Fahrzeuge abrufen
            },
        });

        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'Keine Fahrzeuge gefunden.' });
        }

        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
};

/**
 * Fügt ein neues Fahrzeug hinzu
 */
const addVehicle = async (req, res) => {
    try {
        const {
            name, modelId, typeId, markId, categoryId,
            description, price, dateOfFirstRegistration, mileage,
            fuelType, color, condition
        } = req.body;

        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        // Neues Fahrzeug in der Datenbank speichern
        const vehicle = await Vehicle.create({
            name, modelId, typeId, markId, categoryId,
            description, price, dateOfFirstRegistration, mileage,
            fuelType, color, condition, userId
        });

        // Falls Bilder hochgeladen wurden, speichern
        if (req.files && req.files.length > 0) {
            const imageRecords = req.files.map(file => ({
                vehicleId: vehicle.id,
                url: `/uploads/${file.filename}`
            }));
            await VehiclePictures.bulkCreate(imageRecords);
        }

        res.status(201).json({ message: 'Fahrzeug hinzugefügt!', vehicle });
    } catch (error) {
        console.error('Fehler beim Speichern des Fahrzeugs:', error);
        res.status(500).json({ message: 'Fehler beim Speichern des Fahrzeugs.' });
    }
};

/**
 * Aktualisiert ein Fahrzeug
 */
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, modelId, typeId, description, price,
            dateOfFirstRegistration, mileage, fuelType, color, condition
        } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
        }

        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Nicht berechtigt, dieses Fahrzeug zu bearbeiten' });
        }

        await vehicle.update({
            name, modelId, typeId, description, price,
            dateOfFirstRegistration, mileage, fuelType, color, condition
        });

        res.json({ message: 'Fahrzeug aktualisiert', vehicle });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Fahrzeugs:', error);
        res.status(500).json({ message: 'Fehler beim Fahrzeug-Update' });
    }
};

/**
 * Löscht ein Fahrzeug
 */
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Kein Benutzer gefunden' });
        }

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Fahrzeug nicht gefunden' });
        }

        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unberechtigt: Dieses Fahrzeug gehört nicht dir' });
        }

        await vehicle.destroy();
        res.status(200).json({ message: 'Fahrzeug erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Fahrzeugs:', error);
        res.status(500).json({ error: 'Fehler beim Löschen des Fahrzeugs' });
    }
};

/**
 * Holt alle Fahrzeuge eines Verkäufers
 */
const getSellerListings = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            where: { userId: req.user.id },
            include: [{ model: VehiclePictures, as: 'pictures' }] // Bilder mit einbinden
        });

        res.json(vehicles.length ? vehicles : []);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

/**
 * Markiert ein Fahrzeug als verkauft
 */
const markAsSold = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (vehicle.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        vehicle.sold = true;
        await vehicle.save();

        res.json({ message: 'Vehicle marked as sold', vehicle });
    } catch (error) {
        console.error('Error marking vehicle as sold:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Suchanfrage für Fahrzeuge
 */
const getSearchListings = async (req, res) => {
    try {
        let whereCondition = { sold: false };

        if (req.query.markId) whereCondition.markId = req.query.markId;
        if (req.query.modelId) whereCondition.modelId = req.query.modelId;
        if (req.query.typeId) whereCondition.typeId = req.query.typeId;
        if (req.query.priceMin && req.query.priceMax) whereCondition.price = { [Op.between]: [req.query.priceMin, req.query.priceMax] };
        if (req.query.mileageMin && req.query.mileageMax) whereCondition.mileage = { [Op.between]: [req.query.mileageMin, req.query.mileageMax] };
        if (req.query.city) whereCondition.city = req.query.city;
        if (req.query.fuelType) whereCondition.fuelType = req.query.fuelType;
        if (req.query.color) whereCondition.color = req.query.color;
        if (req.query.condition) whereCondition.condition = req.query.condition;

        const vehicles = await Vehicle.findAll({ where: whereCondition });

        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

/**
 * Holt die Bilder eines Fahrzeugs
 */
const getVehicleImages = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const images = await VehiclePictures.findAll({
            where: { vehicleId },
            attributes: ['url']
        });

        res.json(images.length ? images.map(img => ({ url: `http://localhost:3000${img.url}` })) : []);
    } catch (error) {
        console.error('Fehler beim Abrufen der Bilder:', error);
        res.status(500).json({ error: 'Fehler beim Abrufen der Bilder' });
    }
};

/**
 * Multer-Konfiguration für Bilder-Uploads
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

module.exports = { upload, getVehicleImages, getSearchListings, getVehiclesByCategory, addVehicle, updateVehicle, deleteVehicle, getSellerListings, markAsSold };
