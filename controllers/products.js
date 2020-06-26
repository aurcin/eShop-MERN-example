const formidable = require('formidable');
const fs = require('fs');

const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.create = async (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				success: false,
				error: 'Photo cannot be uploaded',
			});
		}
		const product = new Product(fields);
		if (files.photo) {
			// size validation less than 1mb
			if (files.photo.size > 1000000) {
				return res.status(400).json({
					success: false,
					error: 'Photo size cannot extend 1MB',
				});
			}

			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		try {
			await product.save();

			res.status(201).json({
				success: true,
				data: product,
			});
		} catch (error) {
			return res.status(400).json({
				success: false,
				error: 'Invalid data entered',
			});
		}
	});
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404),
		);
	}

	product.photo = undefined;

	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		data: {},
	});
});
