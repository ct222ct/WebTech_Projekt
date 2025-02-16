// Importiert das User-Modell aus dem Ordner '../models'
const { User } = require('../models');

// Importiert bcrypt für die sichere Passwortverschlüsselung
const bcrypt = require('bcrypt');

// Funktion zum Abrufen der Daten des eingeloggten Benutzers
const getUser = async (req, res) => {
    try {
        // Debugging: Gibt die Benutzer-ID aus, die empfangen wurde
        // console.log('Empfangene Benutzer-ID:', req.user.id);

        // Sucht den Benutzer anhand der in req.user.id gespeicherten ID
        // Die Passwort-Spalte wird ausgeschlossen, um sensible Daten nicht offenzulegen
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }, // Passwort ausblenden
        });

        // Falls kein Benutzer gefunden wurde, sende eine 404-Fehlermeldung zurück
        if (!user) {
            console.error('Benutzer nicht gefunden'); // Debugging
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        // Antwort mit den Benutzerdaten (ohne Passwort)
        res.json({
            name: user.name,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode,
        });
    } catch (error) {
        // Fehlerbehandlung, falls ein Problem beim Abrufen der Daten auftritt
        console.error('Fehler beim Abrufen der Benutzerdaten:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Funktion zum Aktualisieren der Benutzerdaten
const updateUser = async (req, res) => {
    try {
        // Debugging: Gibt die empfangenen Daten aus
        // console.log('Empfangene Daten:', req.body);

        // Extrahiert die neuen Werte aus dem Request-Body
        const { name, email, street, city, postalCode, password } = req.body;

        // Sucht den Benutzer anhand seiner ID
        const user = await User.findByPk(req.user.id);
        if (!user) {
            console.error('Benutzer nicht gefunden'); // Debugging
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        // Debugging: Gibt die Benutzer-ID aus
        // console.log('Benutzer-ID:', req.user.id);

        // Aktualisiert die Benutzerdaten, falls neue Werte übergeben wurden, andernfalls bleiben die alten erhalten
        user.name = name || user.name;
        user.email = email || user.email;
        user.street = street || user.street;
        user.city = city || user.city;
        user.postalCode = postalCode || user.postalCode;

        // Falls ein neues Passwort übergeben wurde, wird es gehasht und gespeichert
        if (password) {
            const salt = await bcrypt.genSalt(10); // Erstellt eine Salt für die Verschlüsselung
            user.password = await bcrypt.hash(password, salt); // Hash das Passwort mit dem Salt
        }

        // Speichert die aktualisierten Benutzerdaten in der Datenbank
        await user.save();

        // Debugging: Gibt die aktualisierten Daten aus
        // console.log('Benutzer aktualisiert:', user);

        // Erfolgreiche Antwort mit aktualisierten Daten
        res.json({ message: 'Profil erfolgreich aktualisiert', user });
    } catch (error) {
        // Fehlerbehandlung, falls ein Problem beim Aktualisieren auftritt
        console.error('Serverfehler:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Exportiert die Funktionen, damit sie in anderen Dateien verwendet werden können
module.exports = {
    getUser,
    updateUser,
};
