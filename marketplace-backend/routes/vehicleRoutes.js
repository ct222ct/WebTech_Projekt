const express = require('express');
const router = express.Router();
const { Vehicle, Model, Type, Mark, Category } = require('../models'); // Ensure Category is imported
const { getVehiclesByType, addVehicle, updateVehicle, deleteVehicle }= require('../controllers/vehicleController');
const { getSellerListings , markAsSold} = require('../controllers/vehicleController');
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
    const vehicles = await Vehicle.findAll({ where: { typeId: req.params.id } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge', error });
  }
});
// Route to handle vehicles by type
router.get('/', getVehiclesByType, authMiddleware);

// Route to get seller's vehicle listings
router.get('/seller/listings', authMiddleware, getSellerListings);

// Routes to add, update, and delete vehicles with pictures
//router.post('/', upload.array('pictures'), addVehicle);
router.put('/:id', upload.array('pictures'), updateVehicle);


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

// Alle Fahrzeugtypen abrufen
router.get('/types', async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    console.error('Fehler beim Abrufen der Typen:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Typen' });
  }
});

router.post('/', authMiddleware, addVehicle); // Add a vehicle
router.put('/:id', authMiddleware, updateVehicle); // Update a vehicle
router.delete('/:id', deleteVehicle);

module.exports = router;
