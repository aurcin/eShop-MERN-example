const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please add a product name'],
			maxlength: [32, 'Product name cannot extend 32 symbols'],
		},
		description: {
			type: String,
			required: [true, 'Please add a product description'],
			maxlength: [2000, 'Product description cannot extend 2000 symbols'],
		},
		price: {
			type: Number,
			trim: true,
			required: [true, 'Please add a product price'],
			maxlength: [32, 'Product price cannot extend 32 symbols'],
		},
		category: {
			type: ObjectId,
			ref: 'Category',
			required: true,
		},
		quantity: {
			type: Number,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		shipping: {
			type: Boolean,
			required: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);
