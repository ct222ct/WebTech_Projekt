const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
        console.error('Kein Token bereitgestellt');
        return res.status(401).json({ message: 'Zugriff verweigert, kein Token vorhanden' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        console.log('Benutzer-ID:', req.user.id); // Debugging
        next();
    } catch (error) {
        console.error('Ungültiges Token:', error.message);
        res.status(403).json({ message: 'Ungültiges Token' });
    }
};

module.exports = authMiddleware;