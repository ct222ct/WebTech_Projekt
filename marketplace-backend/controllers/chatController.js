// Importiert die Modelle 'Chat' und 'Message' aus dem Ordner '../models'
const { Chat, Message } = require('../models');

// Funktion zum Starten eines Chats (falls nicht vorhanden, wird er erstellt)
const startChat = async (req, res) => {
    try {
        // Extrahiert die benötigten Daten aus dem Request-Body
        const { buyerId, sellerId, vehicleId } = req.body;

        // Überprüft, ob alle erforderlichen Parameter vorhanden sind
        if (!buyerId || !sellerId || !vehicleId) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        // Prüft, ob ein Chat mit den gleichen Teilnehmern und Fahrzeug bereits existiert
        let chat = await Chat.findOne({ where: { buyerId, sellerId, vehicleId } });

        // Falls kein Chat gefunden wurde, wird ein neuer erstellt
        if (!chat) {
            try {
                const chat = await Chat.create({ buyerId, sellerId, vehicleId });
                return res.status(201).json({ id: chat.id }); // Stellt sicher, dass die `chatId` zurückgegeben wird
            } catch (error) {
                console.error('Fehler beim Erstellen des Chats:', error);
                return res.status(500).json({ message: 'Serverfehler' });
            }
        }

        // Falls der Chat bereits existiert, wird dessen ID zurückgegeben
        res.json({ id: chat.id });
    } catch (error) {
        // Fehlerbehandlung, falls beim Starten des Chats ein Fehler auftritt
        console.error('Fehler beim Starten des Chats:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Funktion zum Senden einer Nachricht in einem bestehenden Chat
const sendMessage = async (req, res) => {
    try {
        // Extrahiert die erforderlichen Daten aus dem Request-Body
        const { chatId, senderId, text } = req.body;

        // Überprüft, ob alle erforderlichen Parameter vorhanden sind
        if (!chatId || !senderId || !text) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        // Überprüft, ob der angegebene Chat existiert
        const chatExists = await Chat.findByPk(chatId);
        if (!chatExists) {
            return res.status(404).json({ message: 'Chat nicht gefunden' });
        }

        // Erstellt eine neue Nachricht im Chat
        const message = await Message.create({ chatId, senderId, text });

        // Gibt die erstellte Nachricht als JSON zurück
        res.json(message);
    } catch (error) {
        // Fehlerbehandlung, falls beim Senden der Nachricht ein Fehler auftritt
        console.error('Fehler beim Senden der Nachricht:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Funktion zum Abrufen aller Nachrichten eines bestimmten Chats
const getMessages = async (req, res) => {
    try {
        // Extrahiert die Chat-ID aus den Request-Parametern
        const { chatId } = req.params;

        // Ruft alle Nachrichten ab, die zum angegebenen Chat gehören
        const messages = await Message.findAll({ where: { chatId } });

        // Gibt die Nachrichten als JSON zurück
        res.json(messages);
    } catch (error) {
        // Fehlerbehandlung, falls beim Laden der Nachrichten ein Fehler auftritt
        console.error('Fehler beim Laden der Nachrichten:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Exportiert die Funktionen, damit sie in anderen Dateien verwendet werden können
module.exports = { startChat, sendMessage, getMessages };
