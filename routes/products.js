const express = require('express');

const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	productPhotoUpload,
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

const router = express.Router();

router
	.route('/')
	.get(advancedResults(Product), getProducts)
	.post(protect, authorize('admin'), createProduct);
router
	.route('/:id')
	.get(getProduct)
	.put(updateProduct)
	.delete(protect, authorize('admin'), deleteProduct);

router.route('/:id/photo').put(protect, authorize('admin'), productPhotoUpload);

module.exports = router;
