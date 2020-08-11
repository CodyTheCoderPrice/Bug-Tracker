// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
const validateProjectInput = require("../middleware/validation/project/createOrUpdateProjectValidation");
const correctDatesFormat = require("../middleware/correctDatesFormat"); 
// Used instead of the Date() function
const moment = require("moment");

//================
// Create project
//================
router
	.route("/create")
	.post(tokenAuthorization, validateProjectInput, correctDatesFormat, async (req, res) => {
		let inputErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { accountId } = req;
			// Passed in the post body
			const {
				name,
				description,
				priorityId,
				statusId,
				startDate,
				dueDate,
				completionDate,
			} = req.body;
			const creationDate = moment().format("YYYY-MM-DD");

			const createdProject = await pool.query(
				`INSERT INTO project (account_id, name, description, p_priority_id, p_status_id, 
						creation_date, start_date, due_date, completion_date) 
						VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
				[
					accountId,
					name,
					description,
					priorityId,
					statusId,
					creationDate,
					startDate,
					dueDate,
					completionDate,
				]
			);

			// This line of code may not be needed
			if (createdProject.rowCount === 0) {
				throw { message: "Project creation failed" };
			}

			const allProjectsForAccount = await pool.query(
				`WITH p AS (
					SELECT * FROM project WHERE account_id = $1
				)
				SELECT p.project_id, p.account_id, p.name, p.description, p.p_priority_id, p.p_status_id, p.creation_date, 
						p.start_date, p.due_date, p.completion_date, pp.option AS p_priority_option, ps.option AS p_status_option 
							FROM p, project_priority pp, project_status ps 
								WHERE (p.p_priority_id = pp.p_priority_id) 
									AND (p.p_priority_id = ps.p_status_id)`,
				[accountId]
			);
			res.json({ success: true, projects: allProjectsForAccount.rows });
		} catch (err) {
			console.error(err.message);
			inputErrors.server = "Server error while creating project";
			return res.status(500).json({ success: false, inputErrors });
		}
	});

//====================
//  Retrieve projects
//====================
router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { accountId } = req;

		const allProjectsForAccount = await pool.query(
			`WITH p AS (
				SELECT * FROM project WHERE account_id = $1
			)
			SELECT p.project_id, p.account_id, p.name, p.description, p.p_priority_id, p.p_status_id, p.creation_date, 
					p.start_date, p.due_date, p.completion_date, pp.option AS p_priority_option, ps.option AS p_status_option 
						FROM p, project_priority pp, project_status ps 
							WHERE (p.p_priority_id = pp.p_priority_id) 
								AND (p.p_priority_id = ps.p_status_id)`,
			[accountId]
		);

		res.json({ success: true, projects: allProjectsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving projects";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//================
// Update project
//================
router.route("/update").post(tokenAuthorization, validateProjectInput, correctDatesFormat, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { accountId } = req;
		// Passed in the post body
		const {
			projectId,
			name,
			description,
			priorityId,
			statusId,
			startDate,
			dueDate,
			completionDate,
		} = req.body;

		const updatedProject = await pool.query(
			`UPDATE project SET name = $1, description = $2, p_priority_id = $4, 
				p_status_id = $3, start_date = $5, due_date = $6, completion_date = $7 
				WHERE account_id = $8 AND project_id = $9`,
			[
				name,
				description,
				priorityId,
				statusId,
				startDate,
				dueDate,
				completionDate,
				accountId,
				projectId,
			]
		);

		// This line of code may not be needed
		if (updatedProject.rowCount === 0) {
			throw { message: "Project update failed" };
		}

		const allProjectsForAccount = await pool.query(
			`WITH p AS (
				SELECT * FROM project WHERE account_id = $1
			)
			SELECT p.project_id, p.account_id, p.name, p.description, p.p_priority_id, p.p_status_id, p.creation_date, 
					p.start_date, p.due_date, p.completion_date, pp.option AS p_priority_option, ps.option AS p_status_option 
						FROM p, project_priority pp, project_status ps 
							WHERE (p.p_priority_id = pp.p_priority_id) 
								AND (p.p_priority_id = ps.p_status_id)`,
			[accountId]
		);

		res.json({ success: true, projects: allProjectsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while updating account info";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//================
// Delete project
//================
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { accountId } = req;
		// Passed in the post body
		const { projectId } = req.body;

		const deletedProject = await pool.query(
			`DELETE FROM project WHERE account_id = $1 AND project_id = $2`,
			[accountId, projectId]
		);

		if (deletedProject.rowCount === 0) {
			throw { message: "Project deletion failed" };
		}

		const allProjectsForAccount = await pool.query(
			`WITH p AS (
				SELECT * FROM project WHERE account_id = $1
			)
			SELECT p.project_id, p.account_id, p.name, p.description, p.p_priority_id, p.p_status_id, p.creation_date, 
					p.start_date, p.due_date, p.completion_date, pp.option AS p_priority_option, ps.option AS p_status_option 
						FROM p, project_priority pp, project_status ps 
							WHERE (p.p_priority_id = pp.p_priority_id) 
								AND (p.p_priority_id = ps.p_status_id)`,
			[accountId]
		);

		res.json({ success: true, projects: allProjectsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while deleting project";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;
