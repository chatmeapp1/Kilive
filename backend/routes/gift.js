
const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

// Gift routes
router.get('/', giftController.getAllGifts);
router.post('/send', giftController.sendGift);
router.get('/history', giftController.getGiftHistory);

module.exports = router;
