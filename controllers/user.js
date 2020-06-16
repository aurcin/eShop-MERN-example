exports.sayHi = (req, res) => {
	res.status(200).json({
		message: 'hello there',
	});
};
