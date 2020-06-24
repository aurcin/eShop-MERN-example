const express = require('express');

const { create } = require('../controllers/categories');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), create);

module.exports = router;
