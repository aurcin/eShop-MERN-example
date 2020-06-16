const express = require('express');

const { sayHi } = require('../controllers/user');

const router = express.Router();

router.route('/').get(sayHi);

module.exports = router;
