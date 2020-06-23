const express = require('express');

const { getUser } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/:id').get(protect, authorize('admin'), getUser);

module.exports = router;
