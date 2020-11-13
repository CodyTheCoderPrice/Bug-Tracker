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
			inputErrors = { validationAccountEmail: "Email already in use" };
			return res.status(400).json({ success: false, inputErrors });
		}

		// Generate hashed password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) throw err;

				const newAccount = await pool.query(
					`INSERT INTO account (email, hash_pass, first_name, last_name, join_date) 
							VALUES($1, $2, $3, $4, $5)`,
					[email, hash, first_name, last_name, join_date]
				);

				return res.json({ success: true, message: "Account created" });
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
			`SELECT account_id, email, hash_pass, first_name, last_name, join_date
				FROM account 
				WHERE LOWER(email) = LOWER($1)`,
			[email]
		);

		if (account.rowCount === 0) {
			inputErrors = { validationAccountEmail: "Email unregistered" };
			return res.status(401).json({ success: false, inputErrors });
		}

		// Verfies that password is correct
		const passwordMatch = await bcrypt.compare(
			password,
			account.rows[0].hash_pass
		);

		if (!passwordMatch) {
			inputErrors = { validationAccountPassword: "Incorrect password" };
			return res.status(401).json({ success: false, inputErrors });
		}

		const tokenPayload = {
			account_id: account.rows[0].account_id,
		};

		// Removes hash_pass so it is not passed to the front end
		delete account.rows[0].hash_pass;

		// Grab Priority/Status options, as well as all projects, bugs, and comments for the account.
		const projectPriorityOptions = await pool.query(
			`SELECT p_priority_id AS id, option 
				FROM project_priority 
					ORDER BY order_number`
		);

		const projectPriorityEmptyId = await pool.query(
			`SELECT p_priority_id AS id 
				FROM project_priority 
					WHERE marks_empty = true`
		);

		const projectStatusOptions = await pool.query(
			`SELECT p_status_id AS id, option 
				FROM project_status 
					ORDER BY order_number`
		);

		const projectStatusEmptyId = await pool.query(
			`SELECT p_status_id AS id 
				FROM project_status 
					WHERE marks_empty = true`
		);

		const projectStatusCompletionId = await pool.query(
			`SELECT p_status_id AS id 
				FROM project_status 
					WHERE marks_completion = true`
		);

		const bugPriorityOptions = await pool.query(
			`SELECT b_priority_id AS id, option 
				FROM bug_priority 
					ORDER BY order_number`
		);

		const bugPriorityEmptyId = await pool.query(
			`SELECT b_priority_id AS id 
				FROM bug_priority 
					WHERE marks_empty = true`
		);

		const bugStatusOptions = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					ORDER BY order_number`
		);

		const bugStatusEmptyId = await pool.query(
			`SELECT b_status_id AS id 
				FROM bug_status 
					WHERE marks_empty = true`
		);

		const bugStatusCompletionId = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					WHERE marks_completion = true`
		);

		const allProjectsForAccount = await pool.query(
			`WITH p AS 
			(SELECT * FROM project WHERE account_id = $1)
			SELECT p.project_id AS id, p.account_id, p.name, p.description,
				p.p_priority_id AS priority_id, p.p_status_id AS status_id,
				p.creation_date, p.start_date, p.due_date,
				p.completion_date, pp.option AS priority_option, 
				ps.option AS status_option
					FROM p, project_priority pp, project_status ps 
						WHERE (p.p_priority_id = pp.p_priority_id) 
							AND (p.p_status_id = ps.p_status_id)
								ORDER BY p.project_id`,
			[account.rows[0].account_id]
		);

		const allBugsForAccount = await pool.query(
			`WITH b AS 
				(SELECT * FROM bug WHERE project_id IN 
					(SELECT project_id FROM project WHERE account_id = $1)
				)
			SELECT b.bug_id AS id, b.project_id, b.name, b.description, b.location,
				b.b_priority_id AS priority_id, b.b_status_id AS status_id,
				 b.creation_date, b.start_date, b.due_date,
				b.completion_date, bp.option AS priority_option, 
				bs.option AS status_option
					FROM b, bug_priority bp, bug_status bs 
						WHERE (b.b_priority_id = bp.b_priority_id) 
							AND (b.b_status_id = bs.b_status_id)
								ORDER BY b.bug_id`,
			[account.rows[0].account_id]
		);

		const allCommentsForAccount = await pool.query(
			`WITH c AS 
				(SELECT * FROM comment WHERE bug_id IN
					(SELECT bug_id FROM bug WHERE project_id IN 
						(SELECT project_id FROM project WHERE account_id = $1)
					)
				)
			SELECT c.comment_id AS id, c.bug_id, c.description, c.creation_date 
				FROM c
					ORDER BY c.comment_id`,
			[account.rows[0].account_id]
		);

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
					projectPriorityStatusOptions: {
						priorityOptions: projectPriorityOptions.rows,
						priorityEmptyId:
							projectPriorityEmptyId.rowCount < 1
								? null
								: projectPriorityEmptyId.rows[0].id,
						statusOptions: projectStatusOptions.rows,
						statusEmptyId:
							projectStatusEmptyId.rowCount < 1
								? null
								: projectStatusEmptyId.rows[0].id,
						statusCompletionId:
							projectStatusCompletionId.rowCount < 1
								? null
								: projectStatusCompletionId.rows[0].id,
					},
					bugPriorityStatusOptions: {
						priorityOptions: bugPriorityOptions.rows,
						priorityEmptyId:
							bugPriorityEmptyId.rowCount < 1
								? null
								: bugPriorityEmptyId.rows[0].id,
						statusOptions: bugStatusOptions.rows,
						statusEmptyId:
							bugStatusEmptyId.rowCount < 1
								? null
								: bugStatusEmptyId.rows[0].id,
						statusCompletionId:
							bugStatusCompletionId.rowCount < 1
								? null
								: bugStatusCompletionId.rows[0].id,
					},
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

			const updatedAccount = await pool.query(
				`UPDATE account SET first_name = $1, last_name = $2 
					WHERE account_id = $3 
					RETURNING account_id, email, first_name, last_name, join_date`,
				[first_name, last_name, account_id]
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

				// Verify that email does not already exist
				const activeAccounts = await pool.query(
					"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
					[email]
				);

				if (activeAccounts.rowCount > 0) {
					inputErrors = { validationAccountEmail: "Email already in use" };
					return res.status(400).json({ success: false, inputErrors });
				}

				const updatedAccount = await pool.query(
					`UPDATE account SET email = $1 
						WHERE account_id = $2 
						RETURNING account_id, email, first_name, last_name, join_date`,
					[email, account_id]
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

module.exports = router;
