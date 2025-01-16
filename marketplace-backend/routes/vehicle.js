const express = require('express');
const multer = require('multer');
const { Vehicle, Model, VehicleType } = require('../models/vehicle');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Für Bild-Uploads

// Create a new vehicle
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
      pictures: req.files.map(file => file.path), // Bildpfade speichern
    });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a vehicle
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, registrationDate, mileage, fuelType, color, condition, modelId, typeId } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    await vehicle.update({
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
    });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a vehicle
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get vehicles by seller
router.get('/seller/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const vehicles = await Vehicle.findAll({ where: { sellerId: userId } });
    res.json(vehicles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search vehicles
router.get('/search', async (req, res) => {
  const { name, model, type, priceMin, priceMax, city, registrationStart, registrationEnd, mileage, condition } = req.query;

  let whereClause = {};

  if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
  if (model) whereClause.modelId = model;
  if (type) whereClause.typeId = type;
  if (priceMin) whereClause.price = { [Op.gte]: priceMin };
  if (priceMax) whereClause.price = { [Op.lte]: priceMax };
  if (registrationStart || registrationEnd) {
    whereClause.registrationDate = {
      ...(registrationStart ? { [Op.gte]: registrationStart } : {}),
      ...(registrationEnd ? { [Op.lte]: registrationEnd } : {}),
    };
  }
  if (mileage) whereClause.mileage = { [Op.lte]: mileage };
  if (condition) whereClause.condition = condition;

  try {
    const vehicles = await Vehicle.findAll({ where: whereClause });
    res.json(vehicles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports
