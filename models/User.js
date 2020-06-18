const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
			unique: [true, 'Email already exist'],
			lowercase: [true, 'Email must be in lowercase'],
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

		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: [6, 'Password must be at least 6 characters long'],
			select: false,
		},

		resetPasswordToken: String,
		resetPasswordExpire: Date,

		about: {
			type: String,
			trim: true,
		},

		history: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true },
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
