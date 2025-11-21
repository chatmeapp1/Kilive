
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// All routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/status', adminController.toggleUserStatus);
router.post('/gifts', adminController.addGift);
router.get('/income', adminController.getAllIncome);
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
