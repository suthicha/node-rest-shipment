const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.get('/:userId', checkAuth, userController.get_user);
router.get('/all/:userId', checkAuth, userController.get_user_all);
router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;