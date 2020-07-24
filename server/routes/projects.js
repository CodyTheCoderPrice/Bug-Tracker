// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
// Used instead of the Date() function
const moment = require("moment");

//================
// Create project
//================
router.route("/create").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// declared in the tokenAuthorization middleware
		const { accountId } = req;
		// passed in the body
		const { name, description, status, priority, startDate, dueDate, completionDate } = req.body;
		const creationDate = moment().format("YYYY-MM-DD");

		const newProject = await pool.query(
			"INSERT INTO project (account_id, name, description, status, priority, creation_date, start_date, due_date, completion_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[accountId, name, description, status, priority, creationDate, startDate, dueDate, completionDate]
		);

		const allProjects = await pool.query(
			"SELECT * FROM project WHERE account_id = $1",
			[accountId]
		)

		res.json({ success: true, projects: allProjects.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while updating account info";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;
