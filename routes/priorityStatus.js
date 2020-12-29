// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();

//=============================================================
//  Retrieve priority and status tables for projects and bugs
//=============================================================
// Abstracted as stand alone function so it can exported along with the router
// ...to be used during account login requests to avoid repeating code or needing
// ...an additional http request during the login request to retreieve priorityStatus
async function getPriorityStatus() {
	try {
		const projectPriorityList = await pool.query(
			`SELECT p_priority_id AS id, option 
				FROM project_priority 
					ORDER BY order_number`
		);

		// Used by frontend to recongize the empty option without hard coding
		const projectPriorityEmptyId = await pool.query(
			`SELECT p_priority_id AS id 
				FROM project_priority 
					WHERE marks_empty = true`
		);

		const projectStatusList = await pool.query(
			`SELECT p_status_id AS id, option, color
				FROM project_status 
					ORDER BY order_number`
		);

		// Used by frontend to recongize the empty option without hard coding
		const projectStatusEmptyId = await pool.query(
			`SELECT p_status_id AS id 
				FROM project_status 
					WHERE marks_empty = true`
		);

		// Used by frontend to recongize the completed option without hard coding
		const projectStatusCompletionId = await pool.query(
			`SELECT p_status_id AS id 
				FROM project_status 
					WHERE marks_completion = true`
		);

		const bugPriorityList = await pool.query(
			`SELECT b_priority_id AS id, option
				FROM bug_priority 
					ORDER BY order_number`
		);

		// Used by frontend to recongize the empty option without hard coding
		const bugPriorityEmptyId = await pool.query(
			`SELECT b_priority_id AS id 
				FROM bug_priority 
					WHERE marks_empty = true`
		);

		const bugStatusList = await pool.query(
			`SELECT b_status_id AS id, option, color
				FROM bug_status 
					ORDER BY order_number`
		);

		// Used by frontend to recongize the empty option without hard coding
		const bugStatusEmptyId = await pool.query(
			`SELECT b_status_id AS id 
				FROM bug_status 
					WHERE marks_empty = true`
		);

		// Used by frontend to recongize the completed option without hard coding
		const bugStatusCompletionId = await pool.query(
			`SELECT b_status_id AS id, option 
				FROM bug_status 
					WHERE marks_completion = true`
		);

		return {
			projectPriorityStatus: {
				priorityList: projectPriorityList.rows,
				// If there is no empty option, then sets as null
				priorityEmptyId:
					projectPriorityEmptyId.rowCount < 1
						? null
						: projectPriorityEmptyId.rows[0].id,
				statusList: projectStatusList.rows,
				// If there is no empty option, then sets as null
				statusEmptyId:
					projectStatusEmptyId.rowCount < 1
						? null
						: projectStatusEmptyId.rows[0].id,
				// If there is no completed option, then sets as null
				statusCompletionId:
					projectStatusCompletionId.rowCount < 1
						? null
						: projectStatusCompletionId.rows[0].id,
			},
			bugPriorityStatus: {
				priorityList: bugPriorityList.rows,
				// If there is no empty option, then sets as null
				priorityEmptyId:
					bugPriorityEmptyId.rowCount < 1
						? null
						: bugPriorityEmptyId.rows[0].id,
				statusList: bugStatusList.rows,
				// If there is no empty option, then sets as null
				statusEmptyId:
					bugStatusEmptyId.rowCount < 1 ? null : bugStatusEmptyId.rows[0].id,
				// If there is no completed option, then sets as null
				statusCompletionId:
					bugStatusCompletionId.rowCount < 1
						? null
						: bugStatusCompletionId.rows[0].id,
			},
		};
	} catch (err) {
		console.error(err.message);
		return null;
	}
}

router.route("/retrieve").get(async (req, res) => {
	let inputErrors = {};

	try {
		// Function used here was abstracted above so it could also be used by
		// ...the login account request in the account route
		const priorityStatus = await getPriorityStatus();

		// If priorityStatus is null, something went wrong, therefore throw err
		if (priorityStatus === null) {
			throw err;
		}

		res.json({
			success: true,
			...priorityStatus,
		});
	} catch (err) {
		console.error(err.message);
		inputErrors.serverPriorityStatus =
			"Server error while retrieving Priority/Status options";
		return res.status(500).json({ success: false, inputErrors });
	}
});

// Exports both the router and the function the router uses so the account login
// ...request can use the function without creating an additional http request
module.exports = {
	priorityStatusRouter: router,
	getPriorityStatus: getPriorityStatus,
};
