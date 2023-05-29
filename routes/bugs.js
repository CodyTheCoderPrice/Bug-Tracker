// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
const validateBugInput = require("../middleware/validation/bug/createOrUpdateBugValidation");
const correctDatesFormat = require("../middleware/correctDatesFormat");
// functions from other routes
const { getAllCommentsForAccount } = require("./comments");
// Used instead of the Date() function
const moment = require("moment");

//============
// Create bug
//============
router
	.route("/create")
	.post(
		tokenAuthorization,
		validateBugInput,
		correctDatesFormat,
		async (req, res) => {
			let errorMessages = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const {
					name,
					project_id,
					description,
					location,
					priority_id,
					status_id,
					start_date,
					due_date,
					completion_date,
				} = req.body;
				const creation_date = moment.utc().format("YYYY-MM-DD");
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment.utc().format("X");

				const projectBelongsToAccountCheck = await pool.query(
					`SELECT * FROM project WHERE account_id = $1 AND project_id = $2`,
					[account_id, project_id]
				);

				if (projectBelongsToAccountCheck.rowCount === 0) {
					throw { message: "Project does not belong to account" };
				}

				const createdBug = await pool.query(
					`INSERT INTO bug (project_id, name, description, location, 
					b_priority_id, b_status_id, creation_date, start_date, 
					due_date, completion_date, last_edited_timestamp) 
						VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
					[
						project_id,
						name,
						description,
						location,
						priority_id,
						status_id,
						creation_date,
						start_date,
						due_date,
						completion_date,
						last_edited_timestamp,
					]
				);

				// getAllBugsForAccount is declared below
				const allBugsForAccount = await getAllBugsForAccount(account_id);

				// If null, then something went wrong, therefore throw err
				if (allBugsForAccount === null) {
					throw err;
				}

				res.json({ success: true, bugs: allBugsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				errorMessages.serverItem = "Server error while creating bug";
				return res.status(500).json({ success: false, errorMessages });
			}
		}
	);

//================
//  Retrieve bugs
//================
// Abstracted outside of route and later exported (bottom of file) for reuse 
// ...inside this and other route files
async function getAllBugsForAccount(account_id) {
	try {
		// Uses account_id since not all routes have access to project_id
		return await pool.query(
			`WITH b AS 
				(SELECT * FROM bug WHERE project_id IN 
					(SELECT project_id FROM project WHERE account_id = $1)
				)
			SELECT b.bug_id AS id, b.project_id, b.name, b.description, b.location,
				b.b_priority_id AS priority_id, b.b_status_id AS status_id,
				 b.creation_date, b.start_date, b.due_date,
				b.completion_date, last_edited_timestamp,
				bp.option AS priority_option, 
				bs.option AS status_option
					FROM b, bug_priority bp, bug_status bs 
						WHERE (b.b_priority_id = bp.b_priority_id) 
							AND (b.b_status_id = bs.b_status_id)
								ORDER BY b.bug_id`,
			[account_id]
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let errorMessages = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		const allBugsForAccount = await getAllBugsForAccount(account_id);

		// If null, then something went wrong, therefore throw err
		if (allBugsForAccount === null) {
			throw err;
		}

		res.json({ success: true, bugs: allBugsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		errorMessages.serverItem = "Server error while retrieving bugs";
		return res.status(500).json({ success: false, errorMessages });
	}
});

//============
// Update bug
//============
router
	.route("/update")
	.post(
		tokenAuthorization,
		validateBugInput,
		correctDatesFormat,
		async (req, res) => {
			let errorMessages = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const {
					id,
					project_id,
					name,
					description,
					location,
					priority_id,
					status_id,
					start_date,
					due_date,
					completion_date,
				} = req.body;
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment.utc().format("X");

				const projectBelongsToAccountCheck = await pool.query(
					`SELECT * FROM project WHERE account_id = $1 AND project_id = $2`,
					[account_id, project_id]
				);

				if (projectBelongsToAccountCheck.rowCount === 0) {
					throw { message: "Bug does not belong to account" };
				}

				const updatedBug = await pool.query(
					`UPDATE bug SET name = $1, description = $2, location = $3,
					b_priority_id = $4, b_status_id = $5, start_date = $6,
					due_date = $7, completion_date = $8, last_edited_timestamp = $9
						WHERE project_id = $10 AND bug_id = $11`,
					[
						name,
						description,
						location,
						priority_id,
						status_id,
						start_date,
						due_date,
						completion_date,
						last_edited_timestamp,
						project_id,
						id,
					]
				);

				// getAllBugsForAccount is declared below
				const allBugsForAccount = await getAllBugsForAccount(account_id);

				// If null, then something went wrong, therefore throw err
				if (allBugsForAccount === null) {
					throw err;
				}

				res.json({ success: true, bugs: allBugsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				errorMessages.serverItem = "Server error while updating bug";
				return res.status(500).json({ success: false, errorMessages });
			}
		}
	);

//============
// Delete bug
//============
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let errorMessages = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { id, project_id } = req.body;

		const projectBelongsToAccountCheck = await pool.query(
			`SELECT * FROM project WHERE account_id = $1 AND project_id = $2`,
			[account_id, project_id]
		);

		if (projectBelongsToAccountCheck.rowCount === 0) {
			throw { message: "Bug does not belong to account" };
		}

		// Including project_id in WHERE clause to ensure users can't delete 
		// ...bugs that belong to other accounts (as it was checked above that
		// ...the project belongs to the user)
		const deletedBug = await pool.query(
			`DELETE FROM bug WHERE project_id = $1 AND bug_id = $2`,
			[project_id, id]
		);

		// Following data is pulled from DB since bug deletion means they
		// ...(may) need to be updated
		const allBugsForAccount = await getAllBugsForAccount(
			account_id
		);

		const allCommentsForAccount = await getAllCommentsForAccount(
			account_id
		);

		// If any arenull, then something went wrong, therefore throw err
		if (
			allBugsForAccount === null ||
			allCommentsForAccount === null
		) {
			throw err;
		}

		res.json({
			success: true,
			bugs: allBugsForAccount.rows,
			comments: allCommentsForAccount.rows,
		});
	} catch (err) {
		console.error(err.message);
		errorMessages.serverItem = "Server error while deleting bug";
		return res.status(500).json({ success: false, errorMessages });
	}
});

//=======================
// Delete multiple bugs
//=======================
router.route("/delete-multiple").post(tokenAuthorization, async (req, res) => {
	let errorMessages = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { arrayOfBugIdsToBeDeleted } = req.body;

		let bugArrayQueryString = "";

		for (let i = 1; i < arrayOfBugIdsToBeDeleted.length + 1; i++) {
			bugArrayQueryString += "$" + i;
			if (i < arrayOfBugIdsToBeDeleted.length) {
				bugArrayQueryString += ", ";
			}
		}

		// By getting all account_id that the bugs belong to, we can later 
		// ...check that they all belong to the same/correct account. This 
		// ...ensures users can't delete bugs that belong to other accounts.
		const accountsBugsBelongTo = await pool.query(
			`WITH p AS (SELECT project_id FROM bug WHERE bug_id IN (${bugArrayQueryString}))
			SELECT account_id FROM project WHERE project_id IN (SELECT project_id FROM p)`,
			[...arrayOfBugIdsToBeDeleted]
		);

		if (
			accountsBugsBelongTo.rowCount !== 1 ||
			accountsBugsBelongTo.rows[0].account_id !== account_id
		) {
			throw { message: "Bug does not belong to account" };
		}

		const deletedBug = await pool.query(
			`DELETE FROM bug WHERE bug_id IN (${bugArrayQueryString})`,
			[...arrayOfBugIdsToBeDeleted]
		);

		// Following data is pulled from DB since project deletion means they
		// ...(may) need to be updated
		const allBugsForAccount = await getAllBugsForAccount(
			account_id
		);

		const allCommentsForAccount = await getAllCommentsForAccount(
			account_id
		);

		// If any arenull, then something went wrong, therefore throw err
		if (
			allBugsForAccount === null ||
			allCommentsForAccount === null
		) {
			throw err;
		}

		res.json({
			success: true,
			bugs: allBugsForAccount.rows,
			comments: allCommentsForAccount.rows,
		});
	} catch (err) {
		console.error(err.message);
		errorMessages.serverItem = "Server error while deleting bug";
		return res.status(500).json({ success: false, errorMessages });
	}
});

// Also exports getAllProjectsForAccount so other route files can use it
module.exports = {
	bugRouter: router,
	getAllBugsForAccount: getAllBugsForAccount,
};
