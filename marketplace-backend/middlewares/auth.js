// Importiert das 'jsonwebtoken'-Modul für die JWT-Authentifizierung
const jwt = require('jsonwebtoken');

// Middleware-Funktion zur Authentifizierung des Benutzers anhand eines JWT-Tokens
module.exports = (req, res, next) => {
    // Holt den Authorization-Header aus der Anfrage
    const authHeader = req.headers.authorization;

    // Prüft, ob der Authorization-Header vorhanden ist
    if (!authHeader) {
        return res.status(401).json({ message: 'Kein Token bereitgestellt' });
    }

    // Extrahiert das Token aus dem Header (im Format: "Bearer <token>")
    const token = authHeader.split(' ')[1];

    // Debugging: Gibt das empfangene Token in der Konsole aus
    // console.log('Empfangenes Token:', token);

    try {
        // Überprüft das Token mit dem geheimen Schlüssel (JWT_SECRET aus den Umgebungsvariablen)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Debugging: Gibt das entschlüsselte Token-Objekt in der Konsole aus
        // console.log('Entschlüsseltes Token:', decoded);

        // Speichert die entschlüsselten Benutzerdaten im 'req.user'-Objekt für nachfolgende Middleware oder Routen
        req.user = decoded;

        // Übergibt die Kontrolle an die nächste Middleware oder Route
        next();
    } catch (error) {
        // Fehlerbehandlung, falls das Token ungültig oder abgelaufen ist
        console.error('Token-Fehler:', error.message);
        res.status(401).json({ message: 'Ungültiges Token' });
    }
};
