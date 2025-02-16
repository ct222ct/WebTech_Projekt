const express = require('express');
const router = express.Router();
const { startChat, sendMessage, getMessages } = require('../controllers/chatController');

// Chat starten
router.post('/start', startChat);

// Nachricht senden
router.post('/sendMessage', sendMessage);

// Nachrichten abrufen
router.get('/messages/:chatId', getMessages);

module.exports = router;

