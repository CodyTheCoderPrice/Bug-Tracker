// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
const validateBugInput = require("../middleware/validation/bug/createOrUpdateBugValidation");
const correctDatesFormat = require("../middleware/correctDatesFormat");
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
			let inputErrors = {};

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
				const creation_date = moment().format("YYYY-MM-DD");

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
					due_date, completion_date) 
						VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
					]
				);

				// This line of code may not be needed
				if (createdBug.rowCount === 0) {
					throw { message: "Bug creation failed" };
				}

				// Since not all requests have access to project_id,
				// ...this querry gets it using account_id
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
					[account_id]
				);

				res.json({ success: true, bugs: allBugsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverItem = "Server error while creating bug";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

//================
//  Retrieve bugs
//================
router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		// Since not all requests have access to project_id,
		// ...this querry gets it using account_id
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
			[account_id]
		);

		res.json({ success: true, bugs: allBugsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while retrieving bugs";
		return res.status(500).json({ success: false, inputErrors });
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
			let inputErrors = {};

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
					due_date = $7, completion_date = $8
						WHERE project_id = $9 AND bug_id = $10`,
					[
						name,
						description,
						location,
						priority_id,
						status_id,
						start_date,
						due_date,
						completion_date,
						project_id,
						id,
					]
				);

				// This line of code may not be needed
				if (updatedBug.rowCount === 0) {
					throw { message: "Bug update failed" };
				}

				// Since not all requests have access to project_id,
				// ...this querry gets it using account_id
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
					[account_id]
				);

				res.json({ success: true, bugs: allBugsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverItem = "Server error while updating bug";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

//============
// Delete bug
//============
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

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

		const deletedBug = await pool.query(
			`DELETE FROM bug WHERE project_id = $1 AND bug_id = $2`,
			[project_id, id]
		);

		// Since not all requests have access to project_id,
		// ...this querry gets it using account_id
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
			[account_id]
		);

		res.json({ success: true, bugs: allBugsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while deleting bug";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//=======================
// Delete multiple bugs
//=======================
router.route("/delete-multiple").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { bugsArray } = req.body;

		let bugArrayQueryString = "";

		for (let i = 1; i < bugsArray.length + 1; i++) {
			bugArrayQueryString += "$" + i;
			if (i < bugsArray.length) {
				bugArrayQueryString += ", ";
			}
		}

		const projectBelongsToAccountCheck = await pool.query(
			`WITH p AS (SELECT project_id FROM bug WHERE bug_id IN (${bugArrayQueryString}))
			SELECT account_id FROM project WHERE project_id IN (SELECT project_id FROM p)`,
			[...bugsArray]
		);

		if (
			projectBelongsToAccountCheck.rowCount !== 1 ||
			projectBelongsToAccountCheck.rows[0].account_id !== account_id
		) {
			throw { message: "Bug does not belong to account" };
		}

		const deletedBug = await pool.query(
			`DELETE FROM bug WHERE bug_id IN (${bugArrayQueryString})`,
			[...bugsArray]
		);

		// Since not all requests have access to project_id,
		// ...this querry gets it using account_id
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
			[account_id]
		);

		res.json({ success: true, bugs: allBugsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while deleting bug";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;
