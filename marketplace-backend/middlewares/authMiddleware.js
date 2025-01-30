const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = '1234'; // Ersetze dies durch eine sicherere Option in der Produktion

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};

module.exports = authMiddleware;