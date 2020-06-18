const jwt = require('jsonwebtoken');

const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.cookies.token) {
		token = req.cookies.token;
	}

	// make sure token exists
	if (!token) {
		return next(new ErrorResponse('Not autorized to access this route', 401));
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);

		next();
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse('Not autorized to access this route', 401));
	}
});
