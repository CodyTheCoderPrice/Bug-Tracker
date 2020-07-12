// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Security
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware
const validateRegisterInput = require("../middleware/validation/registerValidation");
const validateLoginInput = require("../middleware/validation/loginValidation");
const validateInfoUpdateInput = require("../middleware/validation/updateInfoValidation");
const validateEmailUpdateInput = require("../middleware/validation/updateEmailValidation");
const validatePasswordUpdateInput = require("../middleware/validation/updatePasswordValidation");
const passwordAuthentication = require("../middleware/passwordAuthentication");
const tokenAuthorization = require("../middleware/tokenAuthorization");
// Better alternative to the date object
const moment = require("moment");

//==================
// Register account
//==================
router.route("/register").post(validateRegisterInput, async (req, res) => {
	try {
		const { email, password, firstName, lastName } = req.body;
		const join_date = moment().format("YYYY-MM-DD");

		// Verify that email does not already exist
		const activeAccounts = await pool.query(
			"SELECT * FROM account WHERE email = $1",
			[email]
		);

		if (activeAccounts.rows.length > 0) {
			return res
				.status(400)
				.json({ success: false, errorEmail: "Email already in use" });
		}

		// Generate hashed password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) throw err;

				const newAccount = await pool.query(
					"INSERT INTO account (email, hash_pass, first_name, last_name, join_date) VALUES($1, $2, $3, $4, $5)",
					[email, hash, firstName, lastName, join_date]
				);

				res.json({ success: true, message: "Account created" });
			});
		});
	} catch (err) {
		console.error(err.message);
	}
});

//===============
// Login account
//===============
router.route("/login").post(validateLoginInput, async (req, res) => {
	try {
		const { email, password } = req.body;

		// Verifies that an account with that email exisits
		const account = await pool.query(
			"SELECT account_id, hash_pass FROM account WHERE LOWER(email) = LOWER($1)",
			[email]
		);

		if (account.rows.length === 0) {
			return res
				.status(401)
				.json({ success: false, errorEmail: "Email unregistered" });
		}

		// Verfies that password is correct
		const passwordMatch = await bcrypt.compare(
			password,
			account.rows[0].hash_pass
		);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, errorPassword: "Incorrect password" });
		}

		const payload = {
			accountId: account.rows[0].account_id,
		};

		// Sign token
		jwt.sign(
			payload,
			process.env.jwtSecret,
			{
				expiresIn: "15m",
			},
			(err, token) => {
				res.json({
					success: true,
					token: token,
				});
			}
		);

		// Used for creating a token
		const daysTillExpires = 7;
		const currentDate = moment();
		const dateCreated = currentDate.format("YYYY-MM-DD");
		const dateExpires = currentDate
			.add(daysTillExpires, "days")
			.format("YYYY-MM-DD");
	} catch (err) {
		console.error(err.message);
	}
});

//================
// Verify account
//================
router.route("/verify").get(tokenAuthorization, async (req, res) => {
	try {
		return res.json(true);
	} catch (err) {
		console.error(err.message);
		return res.status(403).json({ notAuthorizaed: "Not Authorized" });
	}
});

//===================
//  Retrieve account
//===================
router.route("/retrieve").get(tokenAuthorization, async (req, res) => {
	try {
		// declared in the tokenAuthorization middleware
		const { accountId } = req;

		const account = await pool.query(
			"SELECT email, first_name, last_name, join_date FROM account WHERE account_id = $1",
			[accountId]
		);

		if (account.rows.length === 0) {
			return res
				.status(401)
				.json({ success: false, errorAccount: "Account not found" });
		}

		return res.json(account.rows[0]);
	} catch (err) {
		console.error(err.message);
		return res.status(403).json({ notAuthorizaed: "Not Authorized" });
	}
});

module.exports = router;

//=====================
// Update account info
//=====================
router
	.route("/update-info")
	.post(tokenAuthorization, validateInfoUpdateInput, async (req, res) => {
		try {
			// declared in the tokenAuthorization middleware
			const { accountId } = req;
			// passed in the body
			const { firstName, lastName } = req.body;

			const updatedAccount = await pool.query(
				"UPDATE account SET first_name = $1, last_name = $2 WHERE account_id = $3",
				[firstName, lastName, accountId]
			);

			if (updatedAccount.rowCount === 0) {
				return res
					.status(400)
					.json({ success: false, errorUpdate: "Could not be updated" });
			} else {
				return res.json({ success: true, message: "Account Info Updated" });
			}
		} catch (err) {
			console.error(err.message);
			return res
				.status(403)
				.json({ success: false, errorAuthorization: "Not Authorized" });
		}
	});

//======================
// Update account email
//======================
router
	.route("/update-email")
	.post(
		tokenAuthorization,
		validateEmailUpdateInput,
		passwordAuthentication,
		async (req, res) => {
			try {
				// declared in the tokenAuthorization middleware
				const { accountId } = req;
				// passed in the body
				const { email } = req.body;

				const updatedAccount = await pool.query(
					"UPDATE account SET email = $1 WHERE account_id = $2",
					[email, accountId]
				);

				if (updatedAccount.rowCount === 0) {
					return res
						.status(400)
						.json({ success: false, errorUpdate: "Could not be updated" });
				} else {
					return res.json({ success: true, message: "Account Updated" });
				}
			} catch (err) {
				console.error(err.message);
				return res
					.status(403)
					.json({ success: false, errorAuthorization: "Not Authorized" });
			}
		}
	);

//=========================
// Update account password
//=========================
router
	.route("/update-password")
	.post(
		tokenAuthorization,
		validatePasswordUpdateInput,
		passwordAuthentication,
		(req, res) => {
			try {
				// declared in the tokenAuthorization middleware
				const { accountId } = req;
				// passed in the body
				const { newPassword } = req.body;

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, async (err, hash) => {
						if (err) throw err;

						const updatedAccount = await pool.query(
							"UPDATE account SET hash_pass = $1 WHERE account_id = $2",
							[hash, accountId]
						);

						if (updatedAccount.rowCount === 0) {
							return res
								.status(400)
								.json({ success: false, errorUpdate: "Could not be updated" });
						} else {
							return res.json({ success: true, message: "Account Updated" });
						}
					});
				});
			} catch (err) {
				console.error(err.message);
				return res
					.status(403)
					.json({ success: false, errorAuthorization: "Not Authorized" });
			}
		}
	);

//================
// Delete account
//================
router
	.route("/delete")
	.post(tokenAuthorization, passwordAuthentication, async (req, res) => {
		try {
			// declared in the tokenAuthorization middleware
			const { accountId } = req;

			const deletedAccount = await pool.query(
				"DELETE FROM account WHERE account_id = $1",
				[accountId]
			);

			if (deletedAccount.rowCount === 0) {
				return res
					.status(400)
					.json({ success: false, errorUpdate: "Could not be deleted" });
			} else {
				return res.json({ success: true, message: "Account Deleted" });
			}
		} catch (err) {
			console.error(err.message);
		}
	});
