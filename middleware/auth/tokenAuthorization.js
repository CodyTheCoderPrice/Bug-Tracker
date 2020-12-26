const jwt = require("jsonwebtoken");

// Where the jwtSecret is declared
require("dotenv").config();

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		const jwToken = req.header("jwToken");

		if (!jwToken) {
			inputErrors.jwToken = "No jwToken";
			console.log(inputErrors);
			return res.status(403).json({ success: false, inputErrors });
		}

		// Uses jwtSecret in .env file to create payload 
		const payload = jwt.verify(jwToken, process.env.jwtSecret);

		req.account_id = payload.account_id;

		// If payload was created succesfully, calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.jwToken = "jwToken verify error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
