const User = require('../models/User');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password, about } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		about,
	});

	sendTokenResponse(user, 201, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSingedJWTToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
		),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token,
	});
};
