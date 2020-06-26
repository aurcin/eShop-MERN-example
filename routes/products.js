const express = require('express');

const {
	create,
	getProduct,
	deleteProduct,
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(protect, authorize('admin'), create);
router
	.route('/:id')
	.get(getProduct)
	.delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
