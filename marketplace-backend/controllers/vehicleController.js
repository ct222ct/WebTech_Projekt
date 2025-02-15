const { Vehicle, VehiclePictures } = require('../models'); // Importieren des Modells
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

const getVehiclesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params; // typeId aus der Anfrage
        console.log('Kategorie-ID:', categoryId);

        const vehicles = await Vehicle.findAll({
            where: {
                categoryId: categoryId,
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
        const {
            name, modelId, typeId, markId, categoryId,
            description, price, dateOfFirstRegistration, mileage,
            fuelType, color, condition
        } = req.body;

        const userId = req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        console.log('Fahrzeugdaten:', req.body);

        // 🚗 Fahrzeug in DB speichern
        const vehicle = await Vehicle.create({
            name, modelId, typeId, markId, categoryId,
            description, price, dateOfFirstRegistration, mileage,
            fuelType, color, condition, userId
        });

        // 📸 Bilder speichern
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

        console.log(`Fahrzeug-Update gestartet für ID: ${id}`);

        // 🚨 Prüfen, ob das Token korrekt übermittelt wurde
        if (!req.user || !req.user.id) {
            console.error('Benutzer-ID fehlt im Token!');
            return res.status(401).json({ message: 'Unauthorized: Benutzer-ID fehlt' });
        }

        const userId = req.user.id;
        console.log(`Benutzer-ID: ${userId}`);

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

        console.log(`Fahrzeug erfolgreich aktualisiert: ${vehicle.id}`);
        res.json({ message: 'Fahrzeug aktualisiert', vehicle });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Fahrzeugs:', error);
        res.status(500).json({ message: 'Fehler beim Fahrzeug-Update' });
    }
};


const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Sicherstellen, dass der Benutzer authentifiziert ist
        if (!req.user || !req.user.id) {
            console.error('Kein Benutzer-Token empfangen');
            return res.status(401).json({ message: 'Unauthorized: Kein Benutzer gefunden' });
        }

        console.log('🗑 Fahrzeug löschen mit ID:', id, 'von Benutzer-ID:', req.user.id);

        const vehicle = await Vehicle.findByPk(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Fahrzeug nicht gefunden' });
        }

        // 🔹 Überprüfung, ob das Fahrzeug dem Benutzer gehört
        if (vehicle.userId !== req.user.id) {
            console.error('Unberechtigter Löschversuch');
            return res.status(403).json({ message: 'Unberechtigt: Dieses Fahrzeug gehört nicht dir' });
        }

        await vehicle.destroy();
        console.log('Fahrzeug erfolgreich gelöscht:', id);
        res.status(200).json({ message: 'Fahrzeug erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Fahrzeugs:', error);
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

const getSearchListings = async (req, res) => {
    try {
        console.log('🔍 Suchanfrage:', req.query);
        console.log('Abruf der Fahrzeuge für Marke:', req.query.markId);
        console.log('Abruf der Fahrzeuge für Model:', req.query.modelId);
        console.log('Abruf der Fahrzeuge für Type:', req.query.typeId);

        let whereCondition = {};
        whereCondition.sold = false;
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


        if (!vehicles.length) {
            console.log('Keine Fahrzeuge gefunden.');
            return res.json([]);
        }

        console.log('Gefundene Fahrzeuge:', vehicles);
        res.json(vehicles);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrzeuge:', error);
        res.status(500).json({message: 'Serverfehler'});
    }
};



module.exports = { getSearchListings, getVehiclesByCategory, addVehicle, updateVehicle, deleteVehicle, getSellerListings, markAsSold }; // Exportieren der Funktionen