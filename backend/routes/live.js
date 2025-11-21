
const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const { authenticate, isHost, isUser } = require('../middleware/authMiddleware');

// Public routes
router.get('/active', liveController.getActiveLives);
router.get('/:roomId', liveController.getLiveDetails);

// Host-only routes
router.post('/start', authenticate, isHost, liveController.startLive);
router.post('/end', authenticate, isHost, liveController.endLive);
router.get('/hours/stats', authenticate, isHost, liveController.getHostLiveHours);

// Authenticated user routes
router.post('/:roomId/join', authenticate, isUser, liveController.joinLive);

module.exports = router;
