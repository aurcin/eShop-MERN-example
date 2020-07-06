const mongoose = require('mongoose');
const config = require('config');
const MONGO_URI = config.get('MONGO_URI');

const connectDB = async () => {
	const connection = await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	console.log(`Databse connected: ${connection.connection.host}`);
};

module.exports = connectDB;
