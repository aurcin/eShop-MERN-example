const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please add a category'],
			maxlength: [32, 'Category cannot extend 32 symbols'],
			unique: [true, 'Category already exists'],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Category', CategorySchema);
