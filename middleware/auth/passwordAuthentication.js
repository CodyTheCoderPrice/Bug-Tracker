const pool = require("../../db");
const bcrypt = require("bcryptjs");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware checkes if the password in req is correct for the account
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = async (req, res, next) => {
	let errorMessages = {};

	try {
		// Declared in the tokenAuthorization middleware which was ran prior
		const { account_id } = req;
		const { currentPassword } = req.body;

		const accountPassword = await pool.query(
			"SELECT hash_pass FROM account WHERE account_id = $1",
			[account_id]
		);

		if (accountPassword.rowCount === 0) {
			errorMessages.databaseAccountNotFound = "Account not found in database";
			// Throws error so next middle/function is not called
			throw new Error (errorMessages.databaseAccountNotFound);
		}

		const passwordMatches = await bcrypt.compare(
			currentPassword,
			accountPassword.rows[0].hash_pass
		);

		if (!passwordMatches) {
			errorMessages.authWrongCurrentPassword = "Incorrect current password";
			// Throws error so next middle/function is not called
			throw new Error (errorMessages.authWrongCurrentPassword);
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);

		// Covering all potential errors
		if (Object.keys(errorMessages).length < 1) {
			errorMessages.backendPasswordAuthorization =
				"Backend error while authorizing password";
		}

		return res.status(403).json({ success: false, errorMessages });
	}
};
