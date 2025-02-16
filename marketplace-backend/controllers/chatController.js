const { Chat, Message } = require('../models');

// Chat starten (falls nicht vorhanden, wird er erstellt)
const startChat = async (req, res) => {
    try {
        const { buyerId, sellerId, vehicleId } = req.body;

        if (!buyerId || !sellerId || !vehicleId) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        let chat = await Chat.findOne({ where: { buyerId, sellerId, vehicleId } });

        if (!chat) {
            try {
                const chat = await Chat.create({ buyerId, sellerId, vehicleId });
                return res.status(201).json({ id: chat.id }); // Stelle sicher, dass die `chatId` zurückkommt!
            } catch (error) {
                console.error('Fehler beim Erstellen des Chats:', error);
                return res.status(500).json({ message: 'Serverfehler' });
            }
        }

        res.json({ id: chat.id });
    } catch (error) {
        console.error('Fehler beim Starten des Chats:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

// Nachricht senden
const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;

        if (!chatId || !senderId || !text) {
            return res.status(400).json({ message: 'Fehlende Parameter' });
        }

        const chatExists = await Chat.findByPk(chatId);
        if (!chatExists) {
            return res.status(404).json({ message: 'Chat nicht gefunden' });
        }

        const message = await Message.create({ chatId, senderId, text });
        res.json(message);
    } catch (error) {
        console.error('Fehler beim Senden der Nachricht:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};


// Nachrichten abrufen
const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.findAll({ where: { chatId } });

        res.json(messages);
    } catch (error) {
        console.error('Fehler beim Laden der Nachrichten:', error);
        res.status(500).json({ message: 'Serverfehler' });
    }
};

module.exports = { startChat, sendMessage, getMessages };
