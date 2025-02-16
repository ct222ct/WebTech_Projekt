const express = require('express');
const { sequelize, User } = require('./models'); // User aus models importieren
const app = express();
const dotenv = require('dotenv');
// CORS-Middleware aktivieren
const cors = require('cors');
const userRoutes = require('./routes/user');
const {json} = require("express");
const categoryRoutes = require('./routes/categoryRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// .env-Konfiguration laden
dotenv.config();
// CORS-Middleware aktivieren
app.use(cors()); // CORS-Middleware aktivieren
// Middleware
app.use(json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelize.sync({ alter: true });
// Benutzer-Routen registrieren
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); // Endpunkte für Kategorien
app.use('/api/vehicles', vehicleRoutes);   // Endpunkte für Fahrzeuge

app.post('/api/users/register', async (req, res) => {
    const { email, password, address } = req.body;

    try {
        // Benutzer speichern
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

/*
app.get('/api/categories/:categoryId/marks', async (req, res) => {
    const categoryId = req.params.categoryId;
    const marks = await Mark.findAll({ where: { categoryId } });
    res.json(marks);
});
 */


app.use('/api/categories', categoryRoutes); // Endpunkt registrieren
const modelRoutes = require('./routes/modelRoutes');
app.use('/api/models', modelRoutes);
const typeRoutes = require('./routes/typeRoutes');
app.use('/api/types', typeRoutes);
const markRoutes = require('./routes/markRoutes');
app.use('/api/marks', markRoutes);
//app.use('/search', vehicleRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));


const http = require('http');
const server = http.createServer(app); // Server definieren
const socketIo = require('socket.io');
const io = socketIo(server, {cors: {
         origin: "http://localhost:4200", // Angular-Frontend
         methods: ["GET", "POST"] }  });

// Starte den WebSocket-Server
io.on('connection', (socket) => {
    console.log('🟢 Ein Benutzer hat sich verbunden:', socket.id);

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`🟢 Benutzer ist Chat ${chatId} beigetreten`);
    });

    socket.on('sendMessage', (message) => {
        io.to(message.chatId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Benutzer hat die Verbindung getrennt');
    });
});


const chatRoutes = require('./routes/chatRoutes'); // Importiere Chat-Routen

app.use('/api/chat', chatRoutes); // Chat-Routen unter "/api/chat"



// Datenbank synchronisieren
(async () => {
    try {
        await sequelize.sync({ alter: false }); // Strukturelle Änderungen anwenden, ohne Constraints zu entfernen
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error during database synchronization:', error);
    }
})();
// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));