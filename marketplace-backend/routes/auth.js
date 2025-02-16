// Importiert benötigte Module
const express = require('express'); // Express.js für die Erstellung von Routen
const bcrypt = require('bcrypt'); // bcrypt für die sichere Passwortverschlüsselung
const jwt = require('jsonwebtoken'); // jsonwebtoken für die Erstellung von JWT-Tokens
const { User } = require('../models'); // Importiert das User-Modell
const router = express.Router(); // Erstellt eine Router-Instanz von Express

// **Benutzerregistrierung (POST /register)**
router.post('/register', async (req, res) => {
  // Extrahiert die Werte aus dem Request-Body
  const { email, password, name } = req.body;

  try {
    // Verschlüsselt das Passwort mit einem Salt von 10 Runden
    const hashedPassword = await bcrypt.hash(password, 10);

    // Erstellt einen neuen Benutzer in der Datenbank mit dem verschlüsselten Passwort
    const user = await User.create({ email, password: hashedPassword, name });

    // Erfolgreiche Registrierung: Antwort mit Status 201 (Created) und dem Benutzerobjekt
    res.status(201).json(user);
  } catch (err) {
    // Fehlerbehandlung: Falls ein Fehler auftritt, sende eine 400-Fehlermeldung zurück
    res.status(400).json({ error: err.message });
  }
});

// **Benutzeranmeldung (POST /login)**
router.post('/login', async (req, res) => {
  // Extrahiert die Werte aus dem Request-Body
  const { email, password } = req.body;

  try {
    // Sucht den Benutzer in der Datenbank anhand der E-Mail
    const user = await User.findOne({ where: { email } });

    // Überprüft, ob der Benutzer existiert und ob das eingegebene Passwort mit dem gespeicherten übereinstimmt
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Erstellt ein JWT-Token mit der Benutzer-ID und E-Mail als Payload
    // Das Token läuft nach 1 Stunde ab (expiresIn: '1h')
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Antwort mit dem Token
    res.json({ token });
  } catch (err) {
    // Fehlerbehandlung: Falls ein Fehler auftritt, sende eine 400-Fehlermeldung zurück
    res.status(400).json({ error: err.message });
  }
});

// Exportiert den Router für die Nutzung in der Hauptanwendungsdatei
module.exports = router;
