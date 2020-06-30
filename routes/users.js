const express = require('express');

const {
	getUser,
	getUsers,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/').get(advancedResults(User), getUsers).post(createUser);

module.exports = router;
