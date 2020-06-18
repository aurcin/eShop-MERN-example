const mongoose = require('mongoose');
//const crypto = require('crypto');
//const uuidv1 = require('uuid/v1');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please add a name'],
			maxlength: [32, 'Name cannot extend 32 symbols'],
		},

		email: {
			type: String,
			trim: true,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please use valid email addrress',
			],
		},

		role: {
			type: String,
			enum: ['user', 'admin'],
			default: ['user'],
		},

		hashed_password: {
			type: String,
			required: true,
		},

		about: {
			type: String,
			trim: true,
		},

		salt: String,

		history: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
