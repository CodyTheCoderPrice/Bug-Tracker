// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Password security
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// Middleware
const validateRegisterInput = require("../middleware/validation/account/registerValidation");
const validateLoginInput = require("../middleware/validation/account/loginValidation");
const validateInfoUpdateInput = require("../middleware/validation/account/updateInfoValidation");
const validateEmailUpdateInput = require("../middleware/validation/account/updateEmailValidation");
const validatePasswordUpdateInput = require("../middleware/validation/account/updatePasswordValidation");
const validateDeleteAccountInput = require("../middleware/validation/account/deleteAccountValidation");
const passwordAuthentication = require("../middleware/auth/passwordAuthentication");
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
// Used instead of the Date() function
const moment = require("moment");

//==================
// Register account
//==================
router.route("/register").post(validateRegisterInput, async (req, res) => {
	let inputErrors = {};

	try {
		const { email, password, first_name, last_name } = req.body;
		const join_date = moment().format("YYYY-MM-DD");

		// Verify that email does not already exist
		const activeAccounts = await pool.query(
			"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
			[email]
		);

		if (activeAccounts.rowCount > 0) {
			inputErrors = { email: "Email already in use" };
			return res.status(400).json({ success: false, inputErrors });
		}

		// Generate hashed password
		bcrypt
			.genSalt(10, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) throw err;

					const newAccount = await pool.query(
						`INSERT INTO account (email, hash_pass, first_name, last_name, join_date) 
							VALUES($1, $2, $3, $4, $5)`,
						[email, hash, first_name, last_name, join_date]
					);
					
					return res.json({ success: true, message: "Account created" });
				});
			})
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while register account";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//===============
// Login account
//===============
router.route("/login").post(validateLoginInput, async (req, res) => {
	let inputErrors = {};

	try {
		const { email, password } = req.body;

		const account = await pool.query(
			`SELECT account_id, email, hash_pass, first_name, last_name, join_date
				FROM account 
				WHERE LOWER(email) = LOWER($1)`,
			[email]
		);

		if (account.rowCount === 0) {
			inputErrors = { email: "Email unregistered" };
			return res.status(401).json({ success: false, inputErrors });
		}

		// Verfies that password is correct
		const passwordMatch = await bcrypt.compare(
			password,
			account.rows[0].hash_pass
		);

		if (!passwordMatch) {
			inputErrors = { password: "Incorrect password" };
			return res.status(401).json({ success: false, inputErrors });
		}

		const tokenPayload = {
			account_id: account.rows[0].account_id,
		};

		// Sign token
		jwt.sign(
			tokenPayload,
			process.env.jwtSecret,
			{
				expiresIn: "1d",
			},
			(err, jwToken) => {
				return res.json({
					success: true,
					jwToken: jwToken,
					account: account.rows[0],
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while logging in";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//=====================
// Check authorization
//=====================
router
	.route("/check-authorization")
	.post(tokenAuthorization, async (req, res) => {
		let inputErrors = {};

		try {
			res.json(true);
		} catch (err) {
			console.error(err.message);
			inputErrors.authorization = "Not authorized";
			return res.status(403).json({ success: false, inputErrors });
		}
	});

//===================
//  Retrieve account
//===================
router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		const account = await pool.query(
			`SELECT account_id, email, first_name, last_name, join_date
				FROM account 
				WHERE account_id = $1`,
			[account_id]
		);

		return res.json({ success: true, account: account.rows[0] });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving account";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;

//=====================
// Update account info
//=====================
router
	.route("/update-info")
	.post(tokenAuthorization, validateInfoUpdateInput, async (req, res) => {
		let inputErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { first_name, last_name } = req.body;

			const updatedAccount = await pool.query(
				`UPDATE account SET first_name = $1, last_name = $2 
					WHERE account_id = $3 
					RETURNING account_id, email, first_name, last_name, join_date`,
				[first_name, last_name, account_id]
			);

			return res.json({ success: true, account: updatedAccount.rows[0] });
		} catch (err) {
			console.error(err.message);
			inputErrors.server = "Server error while updating account info";
			return res.status(500).json({ success: false, inputErrors });
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
			let inputErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const { email } = req.body;

				const updatedAccount = await pool.query(
					`UPDATE account SET email = $1 
						WHERE account_id = $2 
						RETURNING account_id, email, first_name, last_name, join_date`,
					[email, account_id]
				);

				return res.json({ success: true, account: updatedAccount.rows[0] });
			} catch (err) {
				console.error(err.message);
				inputErrors.server = "Server error while updating account email";
				return res.status(500).json({ success: false, inputErrors });
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
			let inputErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const { newPassword } = req.body;

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, async (err, hash) => {
						if (err) throw err;

						const updatedAccount = await pool.query(
							`UPDATE account SET hash_pass = $1 
								WHERE account_id = $2 
								RETURNING account_id, email, first_name, last_name, join_date`,
							[hash, account_id]
						);

						return res.json({ success: true, account: updatedAccount.rows[0] });
					});
				});
			} catch (err) {
				console.error(err.message);
				inputErrors.server = "Server error while updating account password";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

//================
// Delete account
//================
router
	.route("/delete")
	.post(
		tokenAuthorization,
		validateDeleteAccountInput,
		passwordAuthentication,
		async (req, res) => {
			let inputErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;

				const deletedAccount = await pool.query(
					`DELETE FROM account 
						WHERE account_id = $1`,
					[account_id]
				);

				const deletedProjects = await pool.query(
					`DELETE FROM project 
						WHERE account_id = $1`,
					[account_id]
				);

				return res.json({ success: true, message: "Account Deleted" });
			} catch (err) {
				console.error(err.message);
				inputErrors.server = "Server error while deleting account";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

module.exports = router;
