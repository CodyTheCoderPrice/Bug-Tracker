// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();

//==================
//  Retrieve themes
//==================
// Abstracted outside of route and later exported (bottom of file) for reuse 
// ...inside this and other route files
async function getThemes() {
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

router.route("/retrieve-themes").get(async (req, res) => {
	let backendErrors = {};

	try {
		const themes = await getThemes();

		// If null, then something went wrong, therefore throw err
		if (themes === null) {
			throw err;
		}

		return res.json({
			success: true,
			themes: themes.rows,
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
// Abstracted outside of route and later exported (bottom of file) for reuse 
// ...inside this and other route files
async function getSortCategories() {
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

router.route("/retrieve-sort-categories").get(async (req, res) => {
	let backendErrors = {};

	try {
		const sortCategories = await getSortCategories();

		// If null, then something went wrong, therefore throw err
		if (sortCategories === null) {
			throw err;
		}

		return res.json({
			success: true,
			sortCategories: sortCategories.rows,
		});
	} catch (err) {
		console.error(err.message);
		backendErrors.serverAccount =
			"Server error while retrieving sort categories";
		return res.status(500).json({ success: false, backendErrors });
	}
});

//=============================================================
//  Retrieve priority and status tables for projects and bugs
//=============================================================
// Abstracted outside of route and later exported (bottom of file) for reuse 
// ...inside this and other route files
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

router.route("/retrieve-priority-status").get(async (req, res) => {
	let backendErrors = {};

	try {
		// Function used was abstracted above and exported to be used by other routes
		const priorityStatus = await getPriorityStatus();

		// If null, then something went wrong, therefore throw err
		if (priorityStatus === null) {
			throw err;
		}

		res.json({
			success: true,
			...priorityStatus,
		});
	} catch (err) {
		console.error(err.message);
		backendErrors.serverPriorityStatus =
			"Server error while retrieving Priority/Status options";
		return res.status(500).json({ success: false, backendErrors });
	}
});

// Also exports getPriorityStatus so other route files can use it
module.exports = {
	referenceDataRouter: router,
	getThemes: getThemes,
	getSortCategories: getSortCategories,
	getPriorityStatus: getPriorityStatus,
};
