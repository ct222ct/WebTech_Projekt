const express = require('express');
const router = express.Router();
const { Vehicle, Model, Type, Mark } = require('../models');
const {getVehiclesByCategory} = require("../controllers/vehicleController");

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

// Route zum Abrufen von Fahrzeugen nach Kategorie
router.get('/', getVehiclesByCategory);


module.exports = router;
