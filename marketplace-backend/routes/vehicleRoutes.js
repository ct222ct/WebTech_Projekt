const express = require('express');
const router = express.Router();
const { Vehicle, Model, Type, Mark, Category } = require('../models'); // Ensure Category is imported
const { getVehiclesByType, addVehicle, updateVehicle, deleteVehicle }= require('../controllers/vehicleController');
const { getSellerListings , markAsSold, getSearchListings} = require('../controllers/vehicleController');
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/auth');


// Endpunkt: Alle Fahrzeuge einer Kategorie abrufen
router.get('/:category', async (req, res) => {
  try {
    const categoryName = req.params.category;

    // Kategorie finden
    const category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      return res.status(404).json({ message: `Kategorie '${categoryName}' nicht gefunden` });
    }

    // Fahrzeuge dieser Kategorie abrufen
    const vehicles = await Vehicle.findAll({
      where: { categoryId: category.id },
      include: [
        { model: Mark, as: 'mark', attributes: ['name'] },
        { model: Model, as: 'model', attributes: ['name'] },
      ],
    });

    res.json(vehicles);
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeuge:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
});

// Fahrzeuge nach Modell abrufen
router.get('/models/:id', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { modelId: req.params.id } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge', error });
  }
});

// Fahrzeuge nach Typ abrufen
router.get('/types/:id', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { typeId: req.params.id, sold: false, } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge', error });
  }
});
// Route to handle vehicles by type
router.get('/', getVehiclesByType, authMiddleware);

// Route to get seller's vehicle listings
router.get('/seller/listings', authMiddleware, getSellerListings);

// Route to get search mark listings
router.get('/searchMark/listings',getSearchListings );

// Route to mark a vehicle as sold
router.put('/mark-sold/:vehicleId', authMiddleware, markAsSold);

// Alle Modelle abrufen
router.get('/models', async (req, res) => {
  try {
    const models = await Model.findAll();
    res.json(models);
  } catch (error) {
    console.error('Fehler beim Abrufen der Modelle:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
  }
});

router.post('/', authMiddleware, addVehicle); // Add a vehicle
router.put('/:id', authMiddleware, updateVehicle); // Update a vehicle
router.delete('/:id', authMiddleware, deleteVehicle);



router.get('/marks/:markId/models', async (req, res) => {
  const { markId } = req.params;
  const models = await Model.findAll({ where: { markId } });
  res.json(models);
});

router.get('/models/:modelId/vehicles', async (req, res) => {
  const { modelId } = req.params;
  const vehicles = await Vehicle.findAll({ where: { modelId } });
  res.json(vehicles);
});

// Fahrzeug-Details abrufen
router.get('/vehicle-details/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });

    res.json(vehicle);
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeugdetails:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Fahrzeugdetails' });
  }
});

router.get('/all-vehicle/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.findAll();
    res.json(marks);
  } catch (error) {
    console.error('Fehler beim Abrufen der Marken:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Marken' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { markId } = req.query;
    console.log(req.query);
    let whereCondition = {};

    if (markId) whereCondition.markId = markId;

    const vehicles = await Vehicle.findAll({ where: whereCondition });

    if (vehicles.length === 0) {
      return res.status(404).json({ message: 'Keine Fahrzeuge gefunden.' });
    }

    res.json(vehicles);
  } catch (error) {
    console.error('Fehler beim Abrufen der Fahrzeuge:', error);
    res.status(500).json({ message: 'Interner Serverfehler' });
  }
});

module.exports = router;
