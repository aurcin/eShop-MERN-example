const express = require('express');

const {
	register,
	login,
	getUser,
	logout,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getUser).put(protect, updateDetails);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);
router.route('/forgot').post(forgotPassword);
router.route('/password').put(protect, updatePassword);
router.route('/password/:resettoken').put(resetPassword);

module.exports = router;
