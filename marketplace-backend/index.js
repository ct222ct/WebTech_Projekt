// Importiert notwendige Module
const express = require('express');
const { sequelize, User } = require('./models'); // Datenbank-Modelle importieren
const app = express();
const dotenv = require('dotenv'); // Für Umgebungsvariablen
const cors = require('cors'); // Ermöglicht CORS für API-Zugriff von anderen Domains
const { json } = require("express"); // Express JSON-Parser
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

// Routen-Importe
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/categoryRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const modelRoutes = require('./routes/modelRoutes');
const typeRoutes = require('./routes/typeRoutes');
const markRoutes = require('./routes/markRoutes');
const chatRoutes = require('./routes/chatRoutes');

// .env-Konfiguration laden
dotenv.config();

// CORS-Middleware aktivieren, um Anfragen von anderen Domains zu ermöglichen (z. B. für Angular-Frontend)
app.use(cors());

// Middleware für JSON und URL-kodierte Daten aktivieren
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer-Konfiguration für Datei-Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Speichert hochgeladene Dateien im 'uploads/'-Verzeichnis
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Fügt einen Zeitstempel zum Dateinamen hinzu
    },
});
const upload = multer({ storage });

// Statische Dateien aus dem Upload-Verzeichnis bereitstellen
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Datenbank-Synchronisation mit `alter: true`, um neue Änderungen zu übernehmen, ohne Daten zu verlieren
sequelize.sync({ alter: true });

// API-Routen registrieren
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/marks', markRoutes);
app.use('/api/chat', chatRoutes); // Chat-Routen unter "/api/chat"

// **Benutzer-Registrierungs-Route (POST /api/users/register)**
app.post('/api/users/register', async (req, res) => {
    const { email, password, address } = req.body;

    try {
        // Speichert den neuen Benutzer in der Datenbank
        const newUser = await User.create({
            email: email,
            password: password,
            address: address,
        });
        res.status(201).json({ message: 'Registrierung erfolgreich!', user: newUser });
    } catch (error) {
        console.error('Fehler beim Speichern:', error);
        res.status(500).json({ message: 'Fehler beim Speichern der Registrierung.' });
    }
});

// **WebSocket-Server mit Socket.IO für Echtzeitkommunikation**
const http = require('http');
const server = http.createServer(app); // Erstellt einen HTTP-Server mit Express
const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:4200", // Angular-Frontend darf darauf zugreifen
        methods: ["GET", "POST"]
    }
});

// Starte den WebSocket-Server
io.on('connection', (socket) => {
    console.log('Ein Benutzer hat sich verbunden:', socket.id);

    // Ein Benutzer tritt einem Chatraum bei
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`Benutzer ist Chat ${chatId} beigetreten`);
    });

    // Nachricht senden und an alle Teilnehmer im Chatraum weiterleiten
    socket.on('sendMessage', (message) => {
        io.to(message.chatId).emit('receiveMessage', message);
    });

    // Benutzer trennt die Verbindung
    socket.on('disconnect', () => {
        console.log('Benutzer hat die Verbindung getrennt');
    });
});

// **Datenbank-Synchronisation asynchron durchführen**
(async () => {
    try {
        await sequelize.sync({ alter: false }); // Übernimmt neue Änderungen, ohne bestehende Daten zu löschen
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error during database synchronization:', error);
    }
})();

// **Server starten**
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
