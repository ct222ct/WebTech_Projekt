const express = require('express');
const router = express.Router();
const { Vehicle, Model, Type, Mark } = require('../models');

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

module.exports = router;
