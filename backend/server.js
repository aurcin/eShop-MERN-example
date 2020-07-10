const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

connectDB();
const app = express();

if (ENV === 'development') {
	app.use(morgan('dev'));
}

// body parser
app.use(express.json());

app.use(fileUpload());

// enabling cors
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth/users', userRoutes);
app.use('/api/v1/products', productRoutes);

app.use(errorHandler);

const server = app.listen(
	PORT,
	console.log(`Server started in ${ENV} mode on ${PORT} port`),
);

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
