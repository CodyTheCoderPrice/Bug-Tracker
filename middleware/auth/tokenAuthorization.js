const jwt = require("jsonwebtoken");

// Where the jwtSecret is declared
require("dotenv").config();

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware verifies that the jwtToken is (still) valid and if so, 
 * adds the account_id contained inside it to the Express req Object
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let backendErrors = {};

	try {
		const jwToken = req.header("jwToken");

		if (jwToken === undefined) {
			backendErrors.jwToken = "No jwToken";
			console.log(backendErrors);
			return res.status(403).json({ success: false, backendErrors });
		}

		// Uses jwtSecret in .env file to verify jwToken and extract payload
		const jwtPayload = jwt.verify(jwToken, process.env.jwtSecret);

		req.account_id = jwtPayload.account_id;

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		backendErrors.jwToken = "jwToken verify error";
		return res.status(403).json({ success: false, backendErrors });
	}
};
