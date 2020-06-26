const express = require('express');

const { create, productById, getProduct } = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), create);
router.route('/:productId').get(getProduct);

router.param('productId', productById);

module.exports = router;
