const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

connectDB();
const app = express();

if (ENV === 'development') {
	app.use(morgan('dev'));
}

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

const server = app.listen(
	PORT,
	console.log(`Server started in ${ENV} mode on ${PORT} port`),
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
