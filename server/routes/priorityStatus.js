// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();

//=============================================================
//  Retrieve priority and status tables for projects and bugs 
//=============================================================
router.route("/retrieve").get( async (req, res) => {
	let inputErrors = {};

	try {
		const projectPriority = await pool.query(
			`SELECT p_priority_id AS id, option 
				FROM project_priority 
					ORDER BY order_number`
		);

		const projectStatus = await pool.query(
			`SELECT p_status_id AS id, option 
				FROM project_status 
					ORDER BY order_number`
		);

		const projectStatusCompletionIndex = await pool.query(
			`SELECT p_status_id AS id 
				FROM project_status 
					WHERE marks_completion = true`
		);

		const bugPriority = await pool.query(
			`SELECT b_priority_id AS id, option 
				FROM bug_priority 
					ORDER BY order_number`
		);

		const bugStatus = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					ORDER BY order_number`
		);

		const bugStatusCompletionIndex = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					WHERE marks_completion = true`
		);

		res.json({ success: true, 
			projectPriority: projectPriority.rows, 
			projectStatus: projectStatus.rows,
			projectStatusCompletionIndex: projectStatusCompletionIndex.rows[0].id,
			bugPriority: bugPriority.rows, 
			bugStatus: bugStatus.rows,
			bugStatusCompletionIndex: bugStatusCompletionIndex.rows[0].id,
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving project priorities";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;