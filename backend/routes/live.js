
const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');

// Live streaming routes
router.post('/start', liveController.startLive);
router.post('/end', liveController.endLive);
router.get('/active', liveController.getActiveLives);
router.get('/:roomId', liveController.getLiveDetails);
router.post('/:roomId/join', liveController.joinLive);

module.exports = router;
