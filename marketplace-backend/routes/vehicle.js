const express = require('express');
const router = express.Router();
const { Vehicle, Mark, Model, Type } = require('../models');
const auth = require('../middlewares/auth');

// Add a new vehicle (Seller View)
router.post('/', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.create({ ...req.body, userId: req.user.id });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
});

// Update a vehicle (Seller View)
router.put('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle || vehicle.userId !== req.user.id) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    await vehicle.update(req.body);
    res.json({ message: 'Vehicle updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
});

// Delete a vehicle (Seller View)
router.delete('/:id', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle || vehicle.userId !== req.user.id) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    await vehicle.destroy();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
});

// Browse vehicles (Buyer View)
router.get('/', async (req, res) => {
  const { categoryId, markId, modelId, typeId, priceRange } = req.query;
  try {
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (markId) where.markId = markId;
    if (modelId) where.modelId = modelId;
    if (typeId) where.typeId = typeId;
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      where.price = { [Op.between]: [min, max] };
    }

    const vehicles = await Vehicle.findAll({ where });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
});

module.exports = router;
