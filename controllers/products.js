const formidable = require('formidable');
const fs = require('fs');

const Product = require('../models/Product');

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
