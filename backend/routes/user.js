
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/profile/:userId', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/level/:userId', userController.getUserLevel);
router.get('/income/:userId', userController.getUserIncome);
router.get('/fans/:userId', userController.getUserFans);

module.exports = router;
