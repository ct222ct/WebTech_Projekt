const express = require('express');
const userRoutes = require('./user');

const router = express.Router();

// Benutzerbezogene Routen hinzufügen
router.use('/users', userRoutes);

module.exports = router;
