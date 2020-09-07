const pool = require("../../db");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
	let inputErrors = {};

	try {
		// declared in the tokenAuthorization middleware
		const { account_id } = req;
		const { currentPassword } = req.body;

		const account = await pool.query(
			"SELECT hash_pass FROM account WHERE account_id = $1",
			[account_id]
		);

		if (account.rowCount === 0) {
			inputErrors.account = "Account not found";
			return res.status(403).json({ success: false, inputErrors });
		}

		// Verfies that password is correct
		const passwordMatch = await bcrypt.compare(
			currentPassword,
			account.rows[0].hash_pass
		);

		if (!passwordMatch) {
			inputErrors.currentPassword = "Incorrect current password";
			return res.status(400).json({ success: false, inputErrors });
		}

		req.passwordMatch = passwordMatch;
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.authorization = "Authorization error while checking password";
		return res.status(403).json({ success: false, inputErrors });
	}
};
