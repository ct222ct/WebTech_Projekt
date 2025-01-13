const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User } = require('./models');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Testroute, um zu prüfen, ob der Server läuft
app.get('/', (req, res) => {
    res.send('Backend läuft erfolgreich!');
});

// Benutzer registrieren
app.post('/api/register', async (req, res) => {
    const { email, password, address } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, address });
        res.status(201).json({ message: 'Benutzer erfolgreich registriert', user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Benutzer mit dieser Email existiert bereits' });
        } else {
            res.status(500).json({ error: 'Fehler bei der Registrierung' });
        }
    }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
