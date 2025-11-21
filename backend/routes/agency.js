
const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const { authenticate, isAgency } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authenticate);

// Agency-specific routes
router.post('/create', agencyController.createAgency);
router.get('/hosts', isAgency, agencyController.getHosts);
router.get('/income', isAgency, agencyController.getAgencyIncome);
router.post('/hosts', isAgency, agencyController.addHost);
router.get('/hosts/:hostId/performance', isAgency, agencyController.getHostPerformance);

module.exports = router;
