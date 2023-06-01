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
	let errorMessages = {};

	try {
		const jwToken = req.header("jwToken");

		if (jwToken === undefined) {
			errorMessages.jwToken = "No jwToken";
			throw new Error(errorMessages.jwToken);
		}

		try {
			// Uses jwtSecret in .env file to verify jwToken and extract payload
			const jwtPayload = jwt.verify(jwToken, process.env.jwtSecret);

			req.account_id = jwtPayload.account_id;

			// calls next middleware/function
			next();
		} catch (err) {
			errorMessages.jwToken = err.message;
			throw new Error(errorMessages.jwToken);
		}
	} catch (err) {
		console.error(err.message);
		return res.status(403).json({ success: false, errorMessages });
	}
};
