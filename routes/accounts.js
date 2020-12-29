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
// functions from other routes
const { getPriorityStatus } = require("./priorityStatus");
const { getAllProjectsForAccount } = require("./projects");
const { getAllBugsForAccount } = require("./bugs");
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
		// Current time in unix/epoch timestamp
		const last_edited_timestamp = moment().format("X");

		const activeAccountsForEmail = await pool.query(
			"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
			[email]
		);

		// Verify that email does not already exist
		if (activeAccountsForEmail.rowCount > 0) {
			inputErrors = { validationAccountEmail: "Email already in use" };
			return res.status(400).json({ success: false, inputErrors });
		}

		// Generate hashed password
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) throw err;

				try {
					const newAccount = await pool.query(
						`INSERT INTO account (email, hash_pass, first_name, last_name, join_date, last_edited_timestamp)
								VALUES($1, $2, $3, $4, $5, $6)`,
						[
							email,
							hash,
							first_name,
							last_name,
							join_date,
							last_edited_timestamp,
						]
					);

					return res.json({ success: true, message: "Account created" });
				} catch (err) {
					console.error(err.message);
					inputErrors.serverAccount = "Server error while registering account";
					return res.status(500).json({ success: false, inputErrors });
				}
			});
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.serverAccount = "Server error while registering account";
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
			`SELECT account_id, email, hash_pass, first_name, last_name, join_date, last_edited_timestamp
				FROM account 
				WHERE LOWER(email) = LOWER($1)`,
			[email]
		);

		// Verifies email is registered
		if (account.rowCount === 0) {
			inputErrors = { validationAccountEmail: "Email unregistered" };
			return res.status(401).json({ success: false, inputErrors });
		}

		const passwordMatch = await bcrypt.compare(
			password,
			account.rows[0].hash_pass
		);

		// Verfies that password is correct
		if (!passwordMatch) {
			inputErrors = { validationAccountPassword: "Incorrect password" };
			return res.status(401).json({ success: false, inputErrors });
		}

		// Removes hash_pass so it is not passed to the front end
		delete account.rows[0].hash_pass;

		// Grabs Priority/Status options from database since frontend depends on them
		// ...this is done using an exported function from priorityStatus.js
		const priorityStatus = await getPriorityStatus();

		// Grabs projects for account using an exported function from projects.js
		const allProjectsForAccount = await getAllProjectsForAccount(
			account.rows[0].account_id
		);

		// Grabs bugs for account using an exported function from bug.js
		const allBugsForAccount = await getAllBugsForAccount(
			account.rows[0].account_id
		);

		const allCommentsForAccount = await pool.query(
			`WITH c AS 
				(SELECT * FROM comment WHERE bug_id IN
					(SELECT bug_id FROM bug WHERE project_id IN 
						(SELECT project_id FROM project WHERE account_id = $1)
					)
				)
			SELECT c.comment_id AS id, c.bug_id, c.description, 
				c.creation_date, c.last_edited_timestamp 
				FROM c
					ORDER BY c.comment_id`,
			[account.rows[0].account_id]
		);

		// If any arenull, then something went wrong, therefore throw err
		if (
			priorityStatus === null ||
			allProjectsForAccount === null ||
			allBugsForAccount === null
		) {
			throw err;
		}

		// What the hashed jwToken will contain
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
					...priorityStatus,
					account: account.rows[0],
					projects: allProjectsForAccount.rows,
					bugs: allBugsForAccount.rows,
					comments: allCommentsForAccount.rows,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		inputErrors.serverAccount = "Server error while logging in";
		return res.status(500).json({ success: false, inputErrors });
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
			`SELECT account_id, email, first_name, last_name, join_date, last_edited_timestamp
				FROM account 
				WHERE account_id = $1`,
			[account_id]
		);

		return res.json({ success: true, account: account.rows[0] });
	} catch (err) {
		console.error(err.message);
		inputErrors.serverAccount = "Server error while retrieving account";
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
			// Current time in unix/epoch timestamp
			const last_edited_timestamp = moment().format("X");

			const updatedAccount = await pool.query(
				`UPDATE account SET first_name = $1, last_name = $2, last_edited_timestamp = $3 
					WHERE account_id = $4 
					RETURNING account_id, email, first_name, last_name, join_date, last_edited_timestamp`,
				[first_name, last_name, last_edited_timestamp, account_id]
			);

			return res.json({ success: true, account: updatedAccount.rows[0] });
		} catch (err) {
			console.error(err.message);
			inputErrors.serverAccount = "Server error while updating account info";
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
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment().format("X");

				// Verify that email does not already exist
				const activeAccountsForEmail = await pool.query(
					"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
					[email]
				);

				if (activeAccountsForEmail.rowCount > 0) {
					inputErrors = { validationAccountEmail: "Email already in use" };
					return res.status(400).json({ success: false, inputErrors });
				}

				const updatedAccount = await pool.query(
					`UPDATE account SET email = $1, last_edited_timestamp = $2 
						WHERE account_id = $3 
						RETURNING account_id, email, first_name, last_name, join_date, last_edited_timestamp`,
					[email, last_edited_timestamp, account_id]
				);

				return res.json({ success: true, account: updatedAccount.rows[0] });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverAccount = "Server error while updating account email";
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
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment().format("X");

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, async (err, hash) => {
						if (err) throw err;

						const updatedAccount = await pool.query(
							`UPDATE account SET hash_pass = $1, last_edited_timestamp = $2 
								WHERE account_id = $3 
								RETURNING account_id, email, first_name, last_name, join_date, last_edited_timestamp`,
							[hash, last_edited_timestamp, account_id]
						);

						return res.json({ success: true, account: updatedAccount.rows[0] });
					});
				});
			} catch (err) {
				console.error(err.message);
				inputErrors.serverAccount =
					"Server error while updating account password";
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

				return res.json({ success: true, message: "Account Deleted" });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverAccount = "Server error while deleting account";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

module.exports = { accountRouter: router };
