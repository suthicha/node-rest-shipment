const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const trackingController = require('../controllers/trackingController');

router.get('/:userId/:refno', checkAuth, trackingController.find);

module.exports = router;
