// Importiert das 'multer'-Modul für Datei-Uploads
const multer = require('multer');

// Importiert 'path' für die Verwaltung von Dateipfaden
const path = require('path');

// Importiert 'fs' für Dateisystem-Operationen
const fs = require('fs');

// Sicherstellen, dass das `uploads`-Verzeichnis existiert
const uploadDir = path.join(__dirname, '../public/uploads');

// Falls das Verzeichnis nicht existiert, erstelle es (rekursiv für verschachtelte Verzeichnisse)
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfiguration des Speicherorts und Dateinamens für hochgeladene Dateien
const storage = multer.diskStorage({
    // Gibt das Zielverzeichnis für hochgeladene Dateien an
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    // Definiert den Dateinamen der hochgeladenen Datei
    filename: function (req, file, cb) {
        // Erstellt eine eindeutige Dateibenennung mit Zeitstempel + Originalerweiterung
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    }
});

// Erstellt die `multer`-Middleware mit der definierten Speicherstrategie
const upload = multer({ storage: storage });

// Exportiert die `upload`-Middleware, damit sie in anderen Dateien verwendet werden kann
module.exports = upload;
