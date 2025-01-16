const express = require('express');
const multer = require('multer');
const { Vehicle, Model, VehicleType } = require('../models/vehicle/vehicle');
const router = express.Router();
const auth = require('../middlewares/auth');

const { check, validationResult } = require('express-validator');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  },
});


// Create a new vehicle
router.post('/', auth,  upload.array('pictures', 5), [
      check('name').isString().notEmpty(),
      check('price').isFloat({ min: 0 }),
      check('registrationDate').isISO8601(),
      check('mileage').isInt({ min: 0 }),
      check('fuelType').isIn(['Petrol', 'Diesel', 'Electric']),
    ],
    async (req, res) => {
      try {
        const { name, description, price, registrationDate, mileage, fuelType, color, condition, modelId, typeId } =
            req.body;

        const pictures = req.files.map((file) => file.path);

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
          pictures,
        });

        res.status(201).json(vehicle);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
);

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

const { Op } = require('sequelize');

// Suche nach Fahrzeugen mit Pagination
router.get('/search', async (req, res) => {
  const { page = 1, limit = 10, name, model, type, priceMin, priceMax, condition } = req.query;

  const whereClause = {};
  if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
  if (model) whereClause.modelId = model;
  if (type) whereClause.typeId = type;
  if (priceMin) whereClause.price = { [Op.gte]: priceMin };
  if (priceMax) whereClause.price = { ...whereClause.price, [Op.lte]: priceMax };
  if (condition) whereClause.condition = condition;

  const offset = (page - 1) * limit;

  try {
    const vehicles = await Vehicle.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: Model, attributes: ['name'] },
        { model: VehicleType, attributes: ['name'] },
      ],
    });
    res.json({
      total: vehicles.count,
      pages: Math.ceil(vehicles.count / limit),
      data: vehicles.rows,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
