const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

const app = express();

if (ENV === 'development') {
	app.use(morgan('dev'));
}

app.get('/', (req, res) => {
	res.status(200).send('Hi from node');
});

app.listen(PORT, () => {
	console.log(`Server started in ${ENV} mode on ${PORT} port`);
});
