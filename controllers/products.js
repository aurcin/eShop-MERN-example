const formidable = require('formidable');
const _ = require('lodash');
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
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}

		try {
			await product.save();

			res.status(200).json({
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
