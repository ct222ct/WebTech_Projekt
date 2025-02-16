// Importiert das Express-Framework für das Erstellen von Routen
const express = require('express');

// Erstellt eine Router-Instanz für Fahrzeug-Endpunkte
const router = express.Router();

// Importiert die benötigten Datenbankmodelle
const { Vehicle, Model, Type, Mark, Category, VehiclePictures } = require('../models');

// Importiert die Controller-Funktionen für Fahrzeugoperationen
const {
  getVehiclesByCategory,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleImages,
  getSellerListings,
  markAsSold,
  getSearchListings
} = require('../controllers/vehicleController');

// Importiert Middleware für Datei-Uploads und Authentifizierung
const upload = require('../middlewares/multer');
const authMiddleware = require('../middlewares/auth');

// **1. Fahrzeuge nach Modell abrufen (GET /vehicles/models/:id)**
router.get('/models/:id', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { modelId: req.params.id } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge', error });
  }
});

// **2. Fahrzeuge nach Typ abrufen (GET /vehicles/types/:id)**
router.get('/types/:id', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { typeId: req.params.id, sold: false } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Fahrzeuge', error });
  }
});

// **3. Fahrzeuge nach Kategorie abrufen (GET /vehicles/category/:categoryId)**
router.get('/category/:categoryId', getVehiclesByCategory);

// **4. Verkäuferanzeigen abrufen (GET /vehicles/seller/listings)**
router.get('/seller/listings', authMiddleware, getSellerListings);

// **5. Fahrzeug-Suchabfragen (GET /vehicles/searchMark/listings)**
router.get('/searchMark/listings', getSearchListings);

// **6. Fahrzeug als verkauft markieren (PUT /vehicles/mark-sold/:vehicleId)**
router.put('/mark-sold/:vehicleId', authMiddleware, markAsSold);

// **7. Alle Fahrzeugmodelle abrufen (GET /vehicles/models)**
router.get('/models', async (req, res) => {
  try {
    const models = await Model.findAll();
    res.json(models);
  } catch (error) {
    console.error('Fehler beim Abrufen der Modelle:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Modelle' });
  }
});

// **8. Fahrzeug mit Bildern speichern (POST /vehicles)**
router.post('/', authMiddleware, upload.array('images', 5), addVehicle);

// **9. Fahrzeug aktualisieren (PUT /vehicles/:id)**
router.put('/:id', authMiddleware, updateVehicle);

// **10. Fahrzeug löschen (DELETE /vehicles/delete/:id)**
router.delete('/delete/:id', authMiddleware, deleteVehicle);

// **11. Fahrzeugmodelle nach Marke abrufen (GET /vehicles/marks/:markId/models)**
router.get('/marks/:markId/models', async (req, res) => {
  try {
    const models = await Model.findAll({ where: { markId: req.params.markId } });
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Modelle' });
  }
});

// **12. Fahrzeuge eines bestimmten Modells abrufen (GET /vehicles/models/:modelId/vehicles)**
router.get('/models/:modelId/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { modelId: req.params.modelId } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Fahrzeuge' });
  }
});

// **13. Fahrzeugdetails abrufen (GET /vehicles/vehicle-details/:id)**
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

// **14. Alle Fahrzeugdaten abrufen (GET /vehicles/all-vehicle/:id)**
router.get('/all-vehicle/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Fahrzeug nicht gefunden' });
    res.json(vehicle);
  } catch (error) {
    console.error('Fehler beim Abrufen des Fahrzeugs:', error);
    res.status(500).json({ message: 'Serverfehler' });
  }
});

// **15. Alle Marken abrufen (GET /vehicles/marks)**
router.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.findAll();
    res.json(marks);
  } catch (error) {
    console.error('Fehler beim Abrufen der Marken:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Marken' });
  }
});

// **16. Fahrzeuge nach Suchkriterien abrufen (GET /vehicles/search)**
router.get('/search', async (req, res) => {
  try {
    const { markId } = req.query;
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

// **17. Fahrzeugbilder abrufen (GET /vehicles/images/:vehicleId)**
router.get('/images/:vehicleId', getVehicleImages);

// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
