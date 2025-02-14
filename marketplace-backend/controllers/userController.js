const { User } = require('../models');

const bcrypt = require('bcrypt');

// Hol die Daten des eingeloggten Benutzers
const getUser = async (req, res) => {
    try {
        console.log('Empfangene Benutzer-ID:', req.user.id); // Debugging

        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }, // Passwort ausblenden
        });

        if (!user) {
            console.error('Benutzer nicht gefunden'); // Debugging
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }

        res.json({
            name: user.name,
            email: user.email,
            street: user.street,
            city: user.city,
            postalCode: user.postalCode,
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error); // Fehler anzeigen
        res.status(500).json({ message: 'Serverfehler' });
    }
};


// Aktualisiere die Daten des eingeloggten Benutzers
const updateUser = async (req, res) => {
    try {
        console.log('Empfangene Daten:', req.body); // Debug-Ausgabe

        const { name, email, street, city, postalCode, password } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            console.error('Benutzer nicht gefunden'); // Debug-Ausgabe
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
        console.log('Benutzer-ID:', req.user.id);


        // Aktualisiere die Felder
        user.name = name || user.name;
        user.email = email || user.email;
        user.street = street || user.street;
        user.city = city || user.city;
        user.postalCode = postalCode || user.postalCode;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        console.log('Benutzer aktualisiert:', user); // Debug-Ausgabe
        res.json({ message: 'Profil erfolgreich aktualisiert', user });
    } catch (error) {
        console.error('Serverfehler:', error); // Debug-Ausgabe
        res.status(500).json({ message: 'Serverfehler' });
    }
};




module.exports = {
    getUser,
    updateUser,
};
