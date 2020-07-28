const ErrorResponse = require('../utils/errorResponse');

const advancedResults = (model, populate) => async (req, res, next) => {
	try {
		let query;
		const reqQuery = { ...req.query };

		// remove unvanted fields from query
		const removeFields = ['select', 'sort', 'page', 'limit', 'keyword'];
		removeFields.forEach((param) => delete reqQuery[param]);

		if (req.query.keyword) {
			reqQuery.name = { $regex: req.query.keyword, $options: 'i' };
		}

		let queryStr = JSON.stringify(reqQuery);
		// adding $ to: lt, lte, gt, gte, in.
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`,
		);

		query = model.find(JSON.parse(queryStr));
		// if we pass select=param1,param2 and so on
		if (req.query.select) {
			const selectedfields = req.query.select.split(',').join(' ');
			query = query.select(selectedfields);
		}

		// if we pass sort=field1,filed2,-field3 (-before param means desc sort) if no sort we seart by createdAt by default
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			query = query.sort(sortBy);
		} else {
			query = query.sort('-createdAt');
		}

		// pagination
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 100;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		query.skip(startIndex).limit(limit);

		if (populate) {
			query = query.populate(populate);
		}

		// executing query
		const results = await query;

		// pagination next previous
		const pagination = {};
		if (results.length >= limit) {
			pagination.next = {
				page: page + 1,
				limit,
			};
		}

		if (page > 1) {
			pagination.prev = {
				page: page - 1,
				limit,
			};
		}

		res.advancedResults = {
			success: true,
			count: results.length,
			pagination,
			data: results,
		};

		next();
	} catch (error) {
		return next(new ErrorResponse('Cannot get this data', 404));
	}
};

module.exports = advancedResults;
