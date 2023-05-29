// Database
const express = require("express");
const pool = require("../db");
const router = express.Router();
// Middleware
const tokenAuthorization = require("../middleware/auth/tokenAuthorization");
const validateCommentInput = require("../middleware/validation/comment/createOrUpdateCommentValidation");
// Used instead of the Date() function
const moment = require("moment");

//================
// Create comment
//================
router
	.route("/create")
	.post(tokenAuthorization, validateCommentInput, async (req, res) => {
		let errorMessages = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { project_id, bug_id, description } = req.body;
			const creation_date = moment.utc().format("YYYY-MM-DD");
			// Current time in unix/epoch timestamp
			const last_edited_timestamp = moment.utc().format("X");

			const bugAndProjectBelongsToAccountCheck = await pool.query(
				`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
						(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id = $3)`,
				[account_id, project_id, bug_id]
			);

			if (bugAndProjectBelongsToAccountCheck.rowCount === 0) {
				throw { message: "Bug and/or project does not belong to account" };
			}

			const createdComment = await pool.query(
				`INSERT INTO comment (bug_id, description, creation_date, last_edited_timestamp) 
						VALUES($1, $2, $3, $4)`,
				[bug_id, description, creation_date, last_edited_timestamp]
			);

			// getAllBugsForAccount is declared below
			const allCommentsForAccount = await getAllCommentsForAccount(account_id);

			// If null, then something went wrong, therefore throw err
			if (allCommentsForAccount === null) {
				throw err;
			}

			res.json({ success: true, comments: allCommentsForAccount.rows });
		} catch (err) {
			console.error(err.message);
			errorMessages.serverItem = "Server error while creating comment";
			return res.status(500).json({ success: false, errorMessages });
		}
	});

//====================
//  Retrieve comments
//====================
// Abstracted outside of route and later exported (bottom of file) for reuse 
// ...inside this and other route files
async function getAllCommentsForAccount(account_id) {
	try {
		// Uses account_id since not all routes have access to bug_id
		return await pool.query(
			`WITH c AS 
				(SELECT * FROM comment WHERE bug_id IN
					(SELECT bug_id FROM bug WHERE project_id IN 
						(SELECT project_id FROM project WHERE account_id = $1)
					)
				)
			SELECT c.comment_id AS id, c.bug_id, c.description, 
				c.creation_date, c.last_edited_timestamp 
				FROM c
					ORDER BY c.comment_id`,
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

		const allCommentsForAccount = await getAllCommentsForAccount(account_id);

		// If null, then something went wrong, therefore throw err
		if (allCommentsForAccount === null) {
			throw err;
		}

		res.json({ success: true, comments: allCommentsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		errorMessages.serverItem = "Server error while retrieving comments";
		return res.status(500).json({ success: false, errorMessages });
	}
});

//================
// Update comment
//================
router
	.route("/update")
	.post(tokenAuthorization, validateCommentInput, async (req, res) => {
		let errorMessages = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { id, project_id, bug_id, description } = req.body;
			// Current time in unix/epoch timestamp
			const last_edited_timestamp = moment.utc().format("X");

			const belongsToAccountCheck = await pool.query(
				`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
						(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id IN
							(SELECT bug_id FROM comment WHERE bug_id = $3 AND comment_id = $4))`,
				[account_id, project_id, bug_id, id]
			);

			if (belongsToAccountCheck.rowCount === 0) {
				throw {
					message: "Comment, bug and/or project does not belong to account",
				};
			}

			const updatedComment = await pool.query(
				`UPDATE comment SET description = $1, last_edited_timestamp = $2
						WHERE bug_id = $3 AND comment_id = $4`,
				[description, last_edited_timestamp, bug_id, id]
			);

			// Needs updating after deletion
			const allCommentsForAccount = await getAllCommentsForAccount(account_id);

			// If null, then something went wrong, therefore throw err
			if (allCommentsForAccount === null) {
				throw err;
			}

			res.json({ success: true, comments: allCommentsForAccount.rows });
		} catch (err) {
			console.error(err.message);
			errorMessages.serverItem = "Server error while updating comment";
			return res.status(500).json({ success: false, errorMessages });
		}
	});

//================
// Delete comment
//================
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let errorMessages = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { id, project_id, bug_id } = req.body;

		const belongsToAccountCheck = await pool.query(
			`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
					(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id IN
						(SELECT bug_id FROM comment WHERE bug_id = $3 AND comment_id = $4))`,
			[account_id, project_id, bug_id, id]
		);

		if (belongsToAccountCheck.rowCount === 0) {
			throw {
				message: "Comment, bug and/or project does not belong to account",
			};
		}

		// Including bug_id in WHERE clause to ensure users can't delete 
		// ...comments that belong to other accounts (as it was checked above 
		// ...that the bug belongs to the user)
		const deletedComment = await pool.query(
			`DELETE FROM comment WHERE bug_id = $1 AND comment_id = $2`,
			[bug_id, id]
		);

		// Needs updating after deletion
		const allCommentsForAccount = await getAllCommentsForAccount(account_id);

		// If null, then something went wrong, therefore throw err
		if (allCommentsForAccount === null) {
			throw err;
		}

		res.json({ success: true, comments: allCommentsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		errorMessages.serverItem = "Server error while deleting comment";
		return res.status(500).json({ success: false, errorMessages });
	}
});

// Also exports getAllCommentsForAccount so other route files can use it
module.exports = {
	commentRouter: router,
	getAllCommentsForAccount: getAllCommentsForAccount,
};
