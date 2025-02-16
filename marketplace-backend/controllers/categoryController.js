// Importiert die Modelle 'Category' und 'Mark' aus dem Ordner '../models'
const { Category, Mark } = require('../models');

// API-Endpunkt: Kategorie mit Details abrufen
exports.getCategoryDetails = async (req, res) => {
    try {
        // Extrahiert die Kategorie-ID aus den Request-Parametern
        const categoryId = req.params.id;

        // Sucht die Kategorie mit der gegebenen ID in der Datenbank
        // Schließt dabei auch alle zugehörigen 'Mark'-Einträge mit ein
        const category = await Category.findByPk(categoryId, {
            include: [{ model: Mark, as: 'categoryMarks' }] // Die Relation muss korrekt in den Modellen definiert sein
        });

        // Falls die Kategorie nicht gefunden wurde, sende eine 404-Fehlermeldung zurück
        if (!category) {
            return res.status(404).json({ message: 'Kategorie nicht gefunden' });
        }

        // Falls die Kategorie gefunden wurde, sende sie als JSON-Antwort zurück
        res.json(category);
    } catch (error) {
        // Falls ein Fehler auftritt, wird dieser in der Konsole ausgegeben
        console.error(error);

        // Sende eine 500-Fehlermeldung zurück, die auf einen Serverfehler hinweist
        res.status(500).json({ message: 'Serverfehler' });
    }
};
