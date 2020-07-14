const pool = require("../db");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
	try {
		// declared in the tokenAuthorization middleware
		const { accountId } = req;
		const { currentPassword } = req.body;
		let inputErrors = {};

		const account = await pool.query(
			"SELECT hash_pass FROM account WHERE account_id = $1",
			[accountId]
		);

		if (account.rows.length === 0) {
			return res
				.status(403)
				.json({ success: false, errorAuthorization: "Not Authorized" });
		}

		// Verfies that password is correct
		const passwordMatch = await bcrypt.compare(
			currentPassword,
			account.rows[0].hash_pass
		);

		if (!passwordMatch) {
			inputErrors.currentPassword = "Incorrect Password";
			return res.status(400).json({ success: false, inputErrors });
		}

		req.passwordMatch = passwordMatch;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(403).json("Validation Error");
	}
};
