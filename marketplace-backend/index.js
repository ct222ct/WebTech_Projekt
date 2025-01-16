const express = require('express');
const bodyParser = require('body-parser'); // Falls du body-parser nutzt
const vehicleRoutes = require('./routes/vehicle'); // Importiere das Fahrzeug-Routenmodul
const messageRoutes = require('./routes/message'); // Beispiel für ein anderes Modul

const app = express();

app.use(express.json()); // Middleware für JSON-Parsing
app.use(bodyParser.urlencoded({ extended: true })); // Falls benötigt

// Verwende die importierten Routenmodule
app.use('/api/vehicles', vehicleRoutes); // Fahrzeug-Routen
app.use('/api/messages', messageRoutes); // Nachrichten-Routen (falls vorhanden)

// Standard-Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

