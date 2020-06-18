const express = require('express');

const { register, login, getUser, logout } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUser);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);

module.exports = router;
