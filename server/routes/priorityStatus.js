// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();

//=============================================================
//  Retrieve priority and status tables for projects and bugs
//=============================================================
router.route("/retrieve").get(async (req, res) => {
	let inputErrors = {};

	try {
		const projectPriorityOptions = await pool.query(
			`SELECT p_priority_id AS id, option 
				FROM project_priority 
					ORDER BY order_number`
		);

		const projectStatusOptions = await pool.query(
			`SELECT p_status_id AS id, option 
				FROM project_status 
					ORDER BY order_number`
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

		const bugStatusOptions = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					ORDER BY order_number`
		);

		const bugStatusCompletionId = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					WHERE marks_completion = true`
		);

		res.json({
			success: true,
			projectPriorityStatusOptions: {
				priorityOptions: projectPriorityOptions.rows,
				statusOptions: projectStatusOptions.rows,
				statusCompletionId: projectStatusCompletionId.rows[0].id,
			},
			bugPriorityStatusOptions: {
				priorityOptions: bugPriorityOptions.rows,
				statusOptions: bugStatusOptions.rows,
				statusCompletionId: bugStatusCompletionId.rows[0].id,
			},
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving project priorities";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;
