
const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

// Agency routes
router.post('/join', agencyController.joinAgency);
router.get('/hosts', agencyController.getHosts);
router.get('/income', agencyController.getAgencyIncome);
router.post('/add-host', agencyController.addHost);

module.exports = router;
