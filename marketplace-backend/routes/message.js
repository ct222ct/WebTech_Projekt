const express = require('express');
const { Message, Vehicle, User } = require('../models/index2');
const router = express.Router();

// Get messages for a specific vehicle and user
router.get('/:vehicleId', async (req, res) => {
    const { vehicleId } = req.params;
    const { userId } = req.query;

    try {
        const messages = await Message.findAll({
            where: { vehicleId, [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'name'] },
                { model: User, as: 'receiver', attributes: ['id', 'name'] },
            ],
            order: [['createdAt', 'ASC']],
        });
        res.json(messages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Send a new message
router.post('/', async (req, res) => {
    const { content, senderId, receiverId, vehicleId } = req.body;

    try {
        const message = await Message.create({ content, senderId, receiverId, vehicleId });
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
