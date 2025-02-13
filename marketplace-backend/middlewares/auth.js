const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Kein Token bereitgestellt' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Empfangenes Token:', token); // Debugging

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Entschlüsseltes Token:', decoded); // Debugging
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token-Fehler:', error.message); // Debugging
        res.status(401).json({ message: 'Ungültiges Token' });
    }
};
