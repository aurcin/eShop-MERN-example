const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

connectDB();
const app = express();

if (ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.status(200).send('Hi from node');
});

app.use(errorHandler);

const server = app.listen(
	PORT,
	console.log(`Server started in ${ENV} mode on ${PORT} port`),
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
