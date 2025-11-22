const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// ===============================
// ALL ADMIN ROUTES → MUST AUTH + ADMIN ONLY
// ===============================
router.use(authenticate);
router.use(isAdmin);

// ===============================
// USERS MANAGEMENT
// ===============================
router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/status', adminController.toggleUserStatus);

// ===============================
// GIFT MANAGEMENT
// ===============================
router.post('/gifts', adminController.addGift);

// ===============================
// PLATFORM ANALYTICS & INCOME
// ===============================
router.get('/income', adminController.getAllIncome);
router.get('/analytics', adminController.getAnalytics);

module.exports = router;