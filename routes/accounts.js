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
const { getAllCommentsForAccount } = require("./comments");
// Used instead of the Date() function
const moment = require("moment");

//==================
// Register account
//==================
router.route("/register").post(validateRegisterInput, async (req, res) => {
	let backendErrors = {};

	try {
		const { email, password, first_name, last_name } = req.body;
		const join_date = moment.utc().format("YYYY-MM-DD");
		// Current time in unix/epoch timestamp
		const last_edited_timestamp = moment.utc().format("X");

		const activeAccountsForEmail = await pool.query(
			"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
			[email]
		);

		// Verify that email does not already exist
		if (activeAccountsForEmail.rowCount > 0) {
			backendErrors = { validationAccountEmail: "Email already in use" };
			return res.status(400).json({ success: false, backendErrors });
		}

		// Generate hashed password
		bcrypt.genSalt(10, (err, salt) => {
			if (err) throw err;
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) throw err;

				try {
					const newAccount = await pool.query(
						`INSERT INTO account (email, hash_pass, first_name, last_name, join_date, last_edited_timestamp)
								VALUES($1, $2, $3, $4, $5, $6)
									RETURNING account_id`,
						[
							email,
							hash,
							first_name,
							last_name,
							join_date,
							last_edited_timestamp,
						]
					);

					// theme_id, project_sort_id, and bug_sort_id are absent so they will be set to their default values
					const newSetting = await pool.query(
						`INSERT INTO setting (account_id, filter_completed_projects_by_default, filter_completed_bugs_by_default, dark_mode, 
												project_sort_ascending, bug_sort_ascending, last_edited_timestamp)
							VALUES($1, $2, $3, $4, $5, $6, $7)`,
						[
							newAccount.rows[0].account_id,
							false,
							true,
							false,
							true,
							true,
							last_edited_timestamp,
						]
					);

					return res.json({ success: true, message: "Account created" });
				} catch (err) {
					console.error(err.message);
					backendErrors.serverAccount =
						"Server error while registering account";
					return res.status(500).json({ success: false, backendErrors });
				}
			});
		});
	} catch (err) {
		console.error(err.message);
		backendErrors.serverAccount = "Server error while registering account";
		return res.status(500).json({ success: false, backendErrors });
	}
});

//===============
// Login account
//===============
router.route("/login").post(validateLoginInput, async (req, res) => {
	let backendErrors = {};

	try {
		const { email, password } = req.body;

		// Only grabs id and password since getEverythingFromAccount() called
		// ...below will grab all needed account info and this way there is no
		// ...risk of accidentally passing the hash_pass to the frontend
		const accountIdAndPassword = await pool.query(
			`SELECT account_id, hash_pass FROM account WHERE LOWER(email) = LOWER($1)`,
			[email]
		);

		// Verifies email is registered
		if (accountIdAndPassword.rowCount === 0) {
			backendErrors = { validationAccountEmail: "Email unregistered" };
			return res.status(401).json({ success: false, backendErrors });
		}

		const passwordMatch = await bcrypt.compare(
			password,
			accountIdAndPassword.rows[0].hash_pass
		);

		// Verfies that password is correct
		if (!passwordMatch) {
			backendErrors = { validationAccountPassword: "Incorrect password" };
			return res.status(401).json({ success: false, backendErrors });
		}

		// Everything for account is pulled here so login is only one http call
		const {
			account,
			accountSettings,
			accountSettingThemes,
			accountSettingSortCategories,
			priorityStatus,
			allProjectsForAccount,
			allBugsForAccount,
			allCommentsForAccount,
		} = await getEverythingForAccount(accountIdAndPassword.rows[0].account_id);

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
				// Don't need to check if values are null first since that is
				// ...done in getEverythingForAccount
				return res.json({
					success: true,
					...priorityStatus,
					jwToken: jwToken,
					account: account.rows[0],
					accountSettings: accountSettings.rows[0],
					accountSettingThemes: accountSettingThemes.rows,
					accountSettingSortCategories: accountSettingSortCategories.rows,
					projects: allProjectsForAccount.rows,
					bugs: allBugsForAccount.rows,
					comments: allCommentsForAccount.rows,
				});
			}
		);
	} catch (err) {
		console.error(err.message);
		backendErrors.serverAccount = "Server error while logging in";
		return res.status(500).json({ success: false, backendErrors });
	}
});

//===================
//  Retrieve account
//===================
// Abstracted and later exported for reuse inside this and other route files
async function getAccount(account_id) {
	try {
		return await await pool.query(
			`SELECT account_id, email, first_name, last_name, join_date, last_edited_timestamp
				FROM account 
				WHERE account_id = $1`,
			[account_id]
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let backendErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		const account = await getAccount(account_id);

		// If null, then something went wrong, therefore throw err
		if (account === null) {
			throw err;
		}

		return res.json({ success: true, account: account.rows[0] });
	} catch (err) {
		console.error(err.message);
		backendErrors.serverAccount = "Server error while retrieving account";
		return res.status(500).json({ success: false, backendErrors });
	}
});

//====================
//  Retrieve settings
//====================
// Abstracted and later exported for reuse inside this and other route files
async function getAccountSettings(account_id) {
	try {
		return await await pool.query(
			`SELECT setting_id, filter_completed_projects_by_default, filter_completed_bugs_by_default, dark_mode, theme_id,
				(SELECT color FROM theme WHERE theme_id = s.theme_id) AS theme_color,
				project_sort_id, project_sort_ascending, bug_sort_id, bug_sort_ascending, 
					 last_edited_timestamp FROM setting AS s WHERE account_id = $1`,
			[account_id]
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router
	.route("/retrieve-settings")
	.post(tokenAuthorization, async (req, res) => {
		let backendErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;

			const accountSettings = await getAccountSettings(account_id);

			// If null, then something went wrong, therefore throw err
			if (accountSettings === null) {
				throw err;
			}

			return res.json({
				success: true,
				accountSettings: accountSettings.rows[0],
			});
		} catch (err) {
			console.error(err.message);
			backendErrors.serverAccount =
				"Server error while retrieving account settings";
			return res.status(500).json({ success: false, backendErrors });
		}
	});

//==================
//  Retrieve themes
//==================
// Abstracted and later exported for reuse inside this and other route files
async function getAccountSettingThemes() {
	try {
		return await await pool.query(
			`SELECT theme_id, order_number, color, marks_default
				FROM theme
					ORDER BY order_number`
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router
	.route("/retrieve-setting-themes")
	.post(tokenAuthorization, async (req, res) => {
		let backendErrors = {};

		try {
			const accountSettingThemes = await getAccountSettingThemes();

			// If null, then something went wrong, therefore throw err
			if (accountSettingThemes === null) {
				throw err;
			}

			return res.json({
				success: true,
				accountSettingThemes: accountSettingThemes.rows,
			});
		} catch (err) {
			console.error(err.message);
			backendErrors.serverAccount =
				"Server error while retrieving account setting themes";
			return res.status(500).json({ success: false, backendErrors });
		}
	});

//===========================
//  Retrieve sort categories
//===========================
// Abstracted and later exported for reuse inside this and other route files
async function getAccountSettingSortCategories() {
	try {
		return await await pool.query(
			`SELECT sort_id, order_number, category, marks_default
				FROM sort
					ORDER BY order_number`
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router
	.route("/retrieve-setting-sort-categories")
	.post(tokenAuthorization, async (req, res) => {
		let backendErrors = {};

		try {
			const accountSettingSortCategories = await getAccountSettingSortCategories();

			// If null, then something went wrong, therefore throw err
			if (accountSettingSortCategories === null) {
				throw err;
			}

			return res.json({
				success: true,
				accountSettingSortCategories: accountSettingSortCategories.rows,
			});
		} catch (err) {
			console.error(err.message);
			backendErrors.serverAccount =
				"Server error while retrieving sort categories";
			return res.status(500).json({ success: false, backendErrors });
		}
	});

//==================================
//  Retrieve everything for account
//==================================
// Abstracted and later exported for reuse inside this and other route files
async function getEverythingForAccount(account_id) {
	try {
		const account = await getAccount(account_id);

		const accountSettings = await getAccountSettings(account_id);

		const accountSettingThemes = await getAccountSettingThemes();

		const accountSettingSortCategories = await getAccountSettingSortCategories();

		const priorityStatus = await getPriorityStatus();

		const allProjectsForAccount = await getAllProjectsForAccount(
			account.rows[0].account_id
		);

		const allBugsForAccount = await getAllBugsForAccount(
			account.rows[0].account_id
		);

		const allCommentsForAccount = await getAllCommentsForAccount(
			account.rows[0].account_id
		);

		return {
			account: account,
			accountSettings: accountSettings,
			accountSettingThemes: accountSettingThemes,
			accountSettingSortCategories: accountSettingSortCategories,
			priorityStatus: priorityStatus,
			allProjectsForAccount: allProjectsForAccount,
			allBugsForAccount: allBugsForAccount,
			allCommentsForAccount: allCommentsForAccount,
		};
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router
	.route("/retrieve-everything")
	.post(tokenAuthorization, async (req, res) => {
		let backendErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;

			const {
				account,
				accountSettings,
				accountSettingThemes,
				accountSettingSortCategories,
				priorityStatus,
				allProjectsForAccount,
				allBugsForAccount,
				allCommentsForAccount,
			} = await getEverythingForAccount(account_id);

			// Don't need to check if values are null first since that is done
			// ...in getEverythingForAccount
			return res.json({
				success: true,
				...priorityStatus,
				account: account.rows[0],
				accountSettings: accountSettings.rows[0],
				accountSettingThemes: accountSettingThemes.rows,
				accountSettingSortCategories: accountSettingSortCategories.rows,
				projects: allProjectsForAccount.rows,
				bugs: allBugsForAccount.rows,
				comments: allCommentsForAccount.rows,
			});
		} catch (err) {
			console.error(err.message);
			backendErrors.serverAccount =
				"Server error while retrieving everything for account";
			return res.status(500).json({ success: false, backendErrors });
		}
	});

module.exports = router;

//=====================
// Update account info
//=====================
router
	.route("/update-info")
	.post(tokenAuthorization, validateInfoUpdateInput, async (req, res) => {
		let backendErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { first_name, last_name } = req.body;
			// Current time in unix/epoch timestamp
			const last_edited_timestamp = moment.utc().format("X");

			const updatedAccount = await pool.query(
				`UPDATE account SET first_name = $1, last_name = $2, last_edited_timestamp = $3 
					WHERE account_id = $4 
					RETURNING account_id, email, first_name, last_name, join_date, last_edited_timestamp`,
				[first_name, last_name, last_edited_timestamp, account_id]
			);

			return res.json({ success: true, account: updatedAccount.rows[0] });
		} catch (err) {
			console.error(err.message);
			backendErrors.serverAccount = "Server error while updating account info";
			return res.status(500).json({ success: false, backendErrors });
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
			let backendErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const { email } = req.body;
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment.utc().format("X");

				// Verify that email does not already exist
				const activeAccountsForEmail = await pool.query(
					"SELECT * FROM account WHERE LOWER(email) = LOWER($1)",
					[email]
				);

				if (activeAccountsForEmail.rowCount > 0) {
					backendErrors = { validationAccountEmail: "Email already in use" };
					return res.status(400).json({ success: false, backendErrors });
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
				backendErrors.serverAccount =
					"Server error while updating account email";
				return res.status(500).json({ success: false, backendErrors });
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
			let backendErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const { newPassword } = req.body;
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment.utc().format("X");

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
				backendErrors.serverAccount =
					"Server error while updating account password";
				return res.status(500).json({ success: false, backendErrors });
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
			let backendErrors = {};

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
				backendErrors.serverAccount = "Server error while deleting account";
				return res.status(500).json({ success: false, backendErrors });
			}
		}
	);

//=================
// Update settings
//=================
router.route("/update-settings").post(tokenAuthorization, async (req, res) => {
	let backendErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const {
			filter_completed_projects_by_default,
			filter_completed_bugs_by_default,
			dark_mode,
			theme_id,
			project_sort_id,
			project_sort_ascending,
			bug_sort_id,
			bug_sort_ascending,
		} = req.body;
		// Current time in unix/epoch timestamp
		const last_edited_timestamp = moment.utc().format("X");

		const updatedSettings = await pool.query(
			`UPDATE setting SET filter_completed_projects_by_default = $1, filter_completed_bugs_by_default = $2, dark_mode = $3, theme_id = $4, 
				project_sort_id = $5, project_sort_ascending = $6, bug_sort_id = $7, bug_sort_ascending = $8, last_edited_timestamp = $9
					WHERE account_id = $10 
						RETURNING setting_id, filter_completed_projects_by_default, filter_completed_bugs_by_default, dark_mode, theme_id, 
							(SELECT color FROM theme WHERE theme_id = $4) AS theme_color, project_sort_id, project_sort_ascending, 
								bug_sort_id, bug_sort_ascending, last_edited_timestamp`,
			[
				filter_completed_projects_by_default,
				filter_completed_bugs_by_default,
				dark_mode,
				theme_id,
				project_sort_id,
				project_sort_ascending,
				bug_sort_id,
				bug_sort_ascending,
				last_edited_timestamp,
				account_id,
			]
		);

		return res.json({ success: true, settings: updatedSettings.rows[0] });
	} catch (err) {
		console.error(err.message);
		backendErrors.serverSettings =
			"Server error while updating account settings";
		return res.status(500).json({ success: false, backendErrors });
	}
});

// Also exports getAccount and getEverythingForAccount
// ...so other route files can use it
module.exports = {
	accountRouter: router,
	getAccount: getAccount,
	getEverythingForAccount: getEverythingForAccount,
};
