const path = require('path');

const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

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

	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc    Get all products
// @route   GET /api/v1/products/
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404),
		);
	}

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product with id ${req.params.id} not found`, 404),
		);
	}

	product.remove();

	res.status(200).json({
		success: true,
		data: {},
	});
});

// @desc    Upload product photo
// @route   PUT /api/v1/products/:id/photo
// @access  Private
exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorResponse(`Product not found with id of ${id}`, 404));
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const { file } = req.files;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload a image file`, 400));
	}

	// Make sure the image is correct size
	if (file.size > process.env.MAX_FILE_SIZE) {
		return next(
			new ErrorResponse(
				`File is to large, maximum allowed is ${process.env.MAX_FILE_SIZE}b`,
				400,
			),
		);
	}

	// rename file to avoid override when same name different bootcamps was uploaded
	file.name = `photo_${id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}
		await Product.findByIdAndUpdate(id, { photo: file.name });

		res.status(200).json({
			success: true,
			data: file.name,
		});
	});
});
