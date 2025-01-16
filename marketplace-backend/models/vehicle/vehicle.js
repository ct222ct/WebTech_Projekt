const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Model = require('./model');
const VehicleType = require('./type');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const Vehicle = sequelize.define('Vehicle', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fuelType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition: {
        type: DataTypes.ENUM('new', 'used', 'broken'),
        allowNull: false,
    },
});

Vehicle.belongsTo(Model, { foreignKey: 'modelId' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId' });
const upload = multer({ dest: 'uploads/' });

// Beispielroute: Liste aller Kategorien
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Beispielroute: Fahrzeug erstellen
router.post('/', upload.array('pictures', 5), async (req, res) => {
    const { name, description, price, registrationDate, mileage, fuelType, color, condition, modelId, typeId } = req.body;

    try {
        const vehicle = await Vehicle.create({
            name,
            description,
            price,
            registrationDate,
            mileage,
            fuelType,
            color,
            condition,
            modelId,
            typeId,
            pictures: req.files.map(file => file.path),
        });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; // Exportiere den Router