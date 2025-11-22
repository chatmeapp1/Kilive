const express = require('express');
const router = express.Router();
const liveController = require('../controllers/liveController');
const { authenticate, isHost, isUser } = require('../middleware/authMiddleware');

// ===================================================================
// HOST-ONLY ROUTES (static routes selalu di atas)
// ===================================================================
router.post('/start', authenticate, isHost, liveController.startLive);
router.post('/end', authenticate, isHost, liveController.endLive);
router.get('/hours/stats', authenticate, isHost, liveController.getHostLiveHours);

// ===================================================================
// AUTHENTICATED USER ROUTES
// ===================================================================
router.post('/:roomId/join', authenticate, isUser, liveController.joinLive);

// ===================================================================
// PUBLIC ROUTES (dynamic route paling bawah)
// ===================================================================
router.get('/active', liveController.getActiveLives);
router.get('/:roomId', liveController.getLiveDetails);

module.exports = router;