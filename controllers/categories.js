const Category = require('../models/Category');
const asyncHandler = require('../middleware/async');

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private/Admin
exports.create = asyncHandler(async (req, res, next) => {
	const { name } = req.body;
	const category = await Category.create({ name });

	res.status(200).json({
		success: true,
		data: category,
	});
});
