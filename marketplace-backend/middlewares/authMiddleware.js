// Importiert das Modul 'jsonwebtoken' zur Überprüfung von JWT-Tokens
const jwt = require('jsonwebtoken');

// Importiert das User-Modell aus der Datenbank
const { User } = require('../models');

// Middleware-Funktion zur Authentifizierung des Benutzers anhand eines JWT-Tokens
const authMiddleware = async (req, res, next) => {
    // Extrahiert das Token aus dem Authorization-Header (Format: "Bearer <token>")
    const token = req.header('Authorization')?.split(' ')[1];

    // Debugging: Gibt das empfangene Token aus
    // console.log('Token:', token);

    // Falls kein Token bereitgestellt wurde, wird eine 401-Fehlermeldung zurückgegeben
    if (!token) {
        console.error('Kein Token bereitgestellt');
        return res.status(401).json({ message: 'Zugriff verweigert, kein Token vorhanden' });
    }

    try {
        // Überprüft das Token mit dem geheimen Schlüssel (JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Sucht den Benutzer in der Datenbank anhand der im Token enthaltenen ID
        const user = await User.findByPk(decoded.id);

        // Falls kein Benutzer gefunden wurde, gibt es eine 401-Fehlermeldung zurück
        if (!user) {
            return res.status(401).json({ message: 'Benutzer nicht gefunden' });
        }

        // Speichert die Benutzerdaten im 'req.user'-Objekt für nachfolgende Middleware oder Routen
        req.user = user;

        // Debugging: Gibt die Benutzer-ID aus
        // console.log('Benutzer-ID:', req.user.id);

        // Ruft 'next()' auf, um die Verarbeitung der Anfrage fortzusetzen
        next();
    } catch (error) {
        // Falls das Token ungültig oder abgelaufen ist, wird ein 403-Fehler zurückgegeben
        console.error('Ungültiges Token:', error.message);
        res.status(403).json({ message: 'Ungültiges Token' });
    }
};

// Exportiert die Middleware-Funktion, damit sie in anderen Dateien verwendet werden kann
module.exports = authMiddleware;
