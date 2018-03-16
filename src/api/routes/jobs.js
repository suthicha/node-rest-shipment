const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const checkAuth = require('../middleware/check-auth');

router.get('/:etd', checkAuth, jobController.find);
router.get('/:etd/:refno', checkAuth, jobController.find);

module.exports = router;