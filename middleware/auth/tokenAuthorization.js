const jwt = require("jsonwebtoken");

// Where the jwtSecret is declared
require("dotenv").config();

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware verifies that the jwtToken is (still) valid and if so, 
 * adds the account_id contained inside it to the Express req object
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		const jwToken = req.header("jwToken");

		if (jwToken === undefined) {
			inputErrors.jwToken = "No jwToken";
			console.log(inputErrors);
			return res.status(403).json({ success: false, inputErrors });
		}

		// Uses jwtSecret in .env file to verify jwToken and extract payload
		const jwtPayload = jwt.verify(jwToken, process.env.jwtSecret);

		req.account_id = jwtPayload.account_id;

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.jwToken = "jwToken verify error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
