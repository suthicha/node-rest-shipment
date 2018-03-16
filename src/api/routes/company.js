const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const companyController = require('../controllers/companyController');

router.put('/', checkAuth, companyController.insert_company);
router.get('/:userId', checkAuth, companyController.get_company);
router.post('/:cmpId', checkAuth, companyController.update_company);
router.delete('/:cmpId', checkAuth, companyController.delete_company)

module.exports = router;