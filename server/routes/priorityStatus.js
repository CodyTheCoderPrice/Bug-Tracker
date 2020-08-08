// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();

//=============================================================
//  Retrieve priority and status options for projects and bugs 
//=============================================================
router.route("/retrieve").get( async (req, res) => {
	let inputErrors = {};

	try {
		const projectPriorityOptions = await pool.query(
			"SELECT * FROM project_priority ORDER BY order_number"
		);

		const projectStatusOptions = await pool.query(
			"SELECT * FROM project_status ORDER BY order_number"
		);

		const bugPriorityOptions = await pool.query(
			"SELECT * FROM bug_priority ORDER BY order_number"
		);

		const bugStatusOptions = await pool.query(
			"SELECT * FROM bug_status ORDER BY order_number"
		);

		res.json({ success: true, 
			projectPriorityOptions: projectPriorityOptions.rows, 
			projectStatusOptions: projectStatusOptions.rows, 
			bugPriorityOptions: bugPriorityOptions.rows, 
			bugStatusOptions: bugStatusOptions.rows});
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving project priorities";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;