const express = require('express');

const { register, login, getUser } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').get(protect, getUser);

module.exports = router;
