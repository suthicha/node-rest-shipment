const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const bookingController = require('../controllers/bookingController');

router.get('/:type/:refno', checkAuth, bookingController.find);
router.post('/', checkAuth, bookingController.update);

module.exports = router;