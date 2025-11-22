
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, checkOwnership, isHost } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// User profile routes (with ownership check)
router.get('/profile/:userId', checkOwnership, userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/avatar', userController.updateAvatar);
router.put('/nickname', userController.updateNickname);
router.put('/sex', userController.updateSex);
router.put('/age', userController.updateAge);
router.put('/bio', userController.updateBio);
router.get('/level/:userId', checkOwnership, userController.getUserLevel);

// Host-specific routes
router.get('/income/:userId', isHost, checkOwnership, userController.getUserIncome);
router.get('/fans/:userId', checkOwnership, userController.getUserFans);

// Viewer-specific routes
router.get('/coins', userController.getUserCoins);

module.exports = router;
