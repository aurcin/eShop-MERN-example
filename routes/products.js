const express = require('express');

const {
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createProduct);
router
	.route('/:id')
	.get(getProduct)
	.put(updateProduct)
	.delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
