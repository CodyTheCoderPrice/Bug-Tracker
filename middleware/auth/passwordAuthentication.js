const pool = require("../../db");
const bcrypt = require("bcryptjs");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware checkes if the password in req is correct for the account
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = async (req, res, next) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware which was ran prior
		const { account_id } = req;
		const { currentPassword } = req.body;

		const accountPassword = await pool.query(
			"SELECT hash_pass FROM account WHERE account_id = $1",
			[account_id]
		);

		if (accountPassword.rowCount === 0) {
			// returns error and next middle/function is not called
			inputErrors.account = "Account not found";
			return res.status(403).json({ success: false, inputErrors });
		}

		const passwordMatches = await bcrypt.compare(
			currentPassword,
			accountPassword.rows[0].hash_pass
		);

		if (!passwordMatches) {
			// returns error and next middle/function is not called
			inputErrors.currentPassword = "Incorrect current password";
			return res.status(400).json({ success: false, inputErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.authorization = "Authorization error while checking password";
		return res.status(403).json({ success: false, inputErrors });
	}
};
