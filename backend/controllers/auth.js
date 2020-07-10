const crypto = require('crypto');

const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

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

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// validate email & password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// check for user (in model we set password select to false, but here we need it so we selecting it manualy)
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc    Update user details
// @route   PUT /api/v1/auth/
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
	const { name, email } = req.body;

	const user = await User.findByIdAndUpdate(
		req.user.id,
		{ name, email },
		{
			new: true,
			runValidators: true,
		},
	);

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc    Update user password
// @route   PUT /api/v1/auth/password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// check current password
	if (!(await user.matchPassword(req.body.currentPassword))) {
		return next(new ErrorResponse('Password is incorrect', 401));
	}

	user.password = req.body.newPassword;
	await user.save();

	sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// get a reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host',
	)}/api/v1/auth/password/${resetToken}`;

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make put request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset',
			message,
		});

		res.status(200).json({
			success: true,
			data: 'Recovery email sent',
		});
	} catch (error) {
		console.log(error);
		// if something go wrong, get rid of password token and expire fields
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({
			validateBeforeSave: false,
		});

		return next(new ErrorResponse('email could not be sent', 500));
	}
});

// @desc    Logout current user, clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		data: {},
	});
});

// @desc    Reset password
// @route   PUT /api/v1/auth/password/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
	// get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex');

	// find user with same passwordresettoken
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendTokenResponse(user, 200, res);
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

	res.status(statusCode).json({
		success: true,
		token,
	});
};
