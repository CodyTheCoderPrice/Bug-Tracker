// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
const validateProjectInput = require("../middleware/validation/project/createOrUpdateProjectValidation");
const correctDatesFormat = require("../middleware/correctDatesFormat");
// functions from other routes
const { getAllBugsForAccount } = require("./bugs");
const { getAllCommentsForAccount } = require("./comments");
// Used instead of the Date() function
const moment = require("moment");

//================
// Create project
//================
router
	.route("/create")
	.post(
		tokenAuthorization,
		validateProjectInput,
		correctDatesFormat,
		async (req, res) => {
			let inputErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const {
					name,
					description,
					priority_id,
					status_id,
					start_date,
					due_date,
					completion_date,
				} = req.body;
				const creation_date = moment().format("YYYY-MM-DD");
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment().format("X");

				const createdProject = await pool.query(
					`INSERT INTO project (account_id, name, description, p_priority_id, p_status_id, 
					creation_date, start_date, due_date, completion_date, last_edited_timestamp) 
						VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
					[
						account_id,
						name,
						description,
						priority_id,
						status_id,
						creation_date,
						start_date,
						due_date,
						completion_date,
						last_edited_timestamp,
					]
				);

				// getAllProjectsForAccount is declared below
				const allProjectsForAccount = await getAllProjectsForAccount(
					account_id
				);

				// If null, then something went wrong, therefore throw err
				if (allProjectsForAccount === null) {
					throw err;
				}

				res.json({ success: true, projects: allProjectsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverItem = "Server error while creating project";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

//====================
//  Retrieve projects
//====================
// Abstracted and later exported for reuse inside this and other route files
async function getAllProjectsForAccount(account_id) {
	try {
		return await pool.query(
			`WITH p AS 
			(SELECT * FROM project WHERE account_id = $1)
			SELECT p.project_id AS id, p.account_id, p.name, p.description,
				p.p_priority_id AS priority_id, p.p_status_id AS status_id,
				p.creation_date, p.start_date, p.due_date,
				p.completion_date, p.last_edited_timestamp, 
				pp.option AS priority_option, 
				ps.option AS status_option
					FROM p, project_priority pp, project_status ps 
						WHERE (p.p_priority_id = pp.p_priority_id) 
							AND (p.p_status_id = ps.p_status_id)
								ORDER BY p.project_id`,
			[account_id]
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		const allProjectsForAccount = await getAllProjectsForAccount(account_id);

		// If null, then something went wrong, therefore throw err
		if (allProjectsForAccount === null) {
			throw err;
		}

		res.json({ success: true, projects: allProjectsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while retrieving projects";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//================
// Update project
//================
router
	.route("/update")
	.post(
		tokenAuthorization,
		validateProjectInput,
		correctDatesFormat,
		async (req, res) => {
			let inputErrors = {};

			try {
				// Declared in the tokenAuthorization middleware
				const { account_id } = req;
				// Passed in the post body
				const {
					id,
					name,
					description,
					priority_id,
					status_id,
					start_date,
					due_date,
					completion_date,
				} = req.body;
				// Current time in unix/epoch timestamp
				const last_edited_timestamp = moment().format("X");

				const updatedProject = await pool.query(
					`UPDATE project SET name = $1, description = $2, p_priority_id = $3, 
						p_status_id = $4, start_date = $5, due_date = $6, 
						completion_date = $7, last_edited_timestamp = $8
							WHERE account_id = $9 AND project_id = $10`,
					[
						name,
						description,
						priority_id,
						status_id,
						start_date,
						due_date,
						completion_date,
						last_edited_timestamp,
						account_id,
						id,
					]
				);

				const allProjectsForAccount = await getAllProjectsForAccount(
					account_id
				);

				// If null, then something went wrong, therefore throw err
				if (allProjectsForAccount === null) {
					throw err;
				}

				res.json({ success: true, projects: allProjectsForAccount.rows });
			} catch (err) {
				console.error(err.message);
				inputErrors.serverItem = "Server error while updating project";
				return res.status(500).json({ success: false, inputErrors });
			}
		}
	);

//================
// Delete project
//================
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { id } = req.body;

		const deletedProject = await pool.query(
			`DELETE FROM project WHERE account_id = $1 AND project_id = $2`,
			[account_id, id]
		);

		// Following data is pulled from DB since project deletion means they
		// ...(may) need to be updated
		const allProjectsForAccount = await getAllProjectsForAccount(
			account_id
		);

		const allBugsForAccount = await getAllBugsForAccount(
			account.rows[0].account_id
		);

		const allCommentsForAccount = await getAllCommentsForAccount(
			account.rows[0].account_id
		);

		// If any arenull, then something went wrong, therefore throw err
		if (
			allProjectsForAccount === null ||
			allBugsForAccount === null ||
			allCommentsForAccount === null
		) {
			throw err;
		}

		res.json({
			success: true,
			projects: allProjectsForAccount.rows,
			bugs: allBugsForAccount.rows,
			comments: allCommentsForAccount.rows,
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while deleting project";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//==========================
// Delete multiple projects
//==========================
router.route("/delete-multiple").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { projectsArray } = req.body;

		let projectArrayQueryString = "";

		for (let i = 1; i < projectsArray.length + 1; i++) {
			projectArrayQueryString += "$" + i;
			if (i < projectsArray.length) {
				projectArrayQueryString += ", ";
			}
		}

		const deletedProject = await pool.query(
			`DELETE FROM project WHERE project_id IN (${projectArrayQueryString}) 
			AND account_id = $${projectsArray.length + 1}`,
			[...projectsArray, account_id]
		);

		// Following data is pulled from DB since project deletion means they
		// ...(may) need to be updated
		const allProjectsForAccount = await getAllProjectsForAccount(
			account_id
		);

		const allBugsForAccount = await getAllBugsForAccount(
			account.rows[0].account_id
		);

		const allCommentsForAccount = await getAllCommentsForAccount(
			account.rows[0].account_id
		);

		// If any arenull, then something went wrong, therefore throw err
		if (
			allProjectsForAccount === null ||
			allBugsForAccount === null ||
			allCommentsForAccount === null
		) {
			throw err;
		}

		res.json({
			success: true,
			projects: allProjectsForAccount.rows,
			bugs: allBugsForAccount.rows,
			comments: allCommentsForAccount.rows,
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.serverItem = "Server error while deleting project";
		return res.status(500).json({ success: false, inputErrors });
	}
});

// Also exports getAllProjectsForAccount so other route files can use it
module.exports = {
	projectRouter: router,
	getAllProjectsForAccount: getAllProjectsForAccount,
};
