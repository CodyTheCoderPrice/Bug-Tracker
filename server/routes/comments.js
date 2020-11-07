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
		let inputErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { project_id, bug_id, description } = req.body;
			const creation_date = moment().format("YYYY-MM-DD");

			const bugAndProjectBelongsToAccountCheck = await pool.query(
				`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
						(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id = $3)`,
				[account_id, project_id, bug_id]
			);

			if (bugAndProjectBelongsToAccountCheck.rowCount === 0) {
				throw { message: "Bug and/or project does not belong to account" };
			}

			const createdComment = await pool.query(
				`INSERT INTO comment (bug_id, description, creation_date) 
						VALUES($1, $2, $3)`,
				[bug_id, description, creation_date]
			);

			// This line of code may not be needed
			if (createdComment.rowCount === 0) {
				throw { message: "Comment creation failed" };
			}

			// Since not all requests have access to bug_id,
			// ...this querry gets it using account_id
			const allCommentsForAccount = await pool.query(
				`WITH c AS 
					(SELECT * FROM comment WHERE bug_id IN
						(SELECT bug_id FROM bug WHERE project_id IN 
							(SELECT project_id FROM project WHERE account_id = $1)
						)
					)
				SELECT c.comment_id AS id, c.bug_id, c.description, c.creation_date 
					FROM c
						ORDER BY c.comment_id`,
				[account_id]
			);

			res.json({ success: true, comments: allCommentsForAccount.rows });
		} catch (err) {
			console.error(err.message);
			inputErrors.server = "Server error while creating comment";
			return res.status(500).json({ success: false, inputErrors });
		}
	});

//====================
//  Retrieve comments
//====================
router.route("/retrieve").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;

		// Since not all requests have access to bug_id,
		// ...this querry gets it using account_id
		const allCommentsForAccount = await pool.query(
			`WITH c AS 
				(SELECT * FROM comment WHERE bug_id IN
					(SELECT bug_id FROM bug WHERE project_id IN 
						(SELECT project_id FROM project WHERE account_id = $1)
					)
				)
			SELECT c.comment_id AS id, c.bug_id, c.description, c.creation_date 
				FROM c
					ORDER BY c.comment_id`,
			[account_id]
		);

		res.json({ success: true, comments: allCommentsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while retrieving comments";
		return res.status(500).json({ success: false, inputErrors });
	}
});

//================
// Update comment
//================
router
	.route("/update")
	.post(tokenAuthorization, validateCommentInput, async (req, res) => {
		let inputErrors = {};

		try {
			// Declared in the tokenAuthorization middleware
			const { account_id } = req;
			// Passed in the post body
			const { id, project_id, bug_id, description } = req.body;

			const belongsToAccountCheck = await pool.query(
				`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
						(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id IN
							(SELECT bug_id FROM comment WHERE bug_id = $3 AND comment_id = $4))`,
				[account_id, project_id, bug_id, id]
			);
	
			if (belongsToAccountCheck.rowCount === 0) {
				throw { message: "Comment, bug and/or project does not belong to account" };
			}

			const updatedComment = await pool.query(
				`UPDATE comment SET description = $1
						WHERE bug_id = $2 AND comment_id = $3`,
				[description, bug_id, id]
			);

			// This line of code may not be needed
			if (updatedComment.rowCount === 0) {
				throw { message: "Comment update failed" };
			}

			// Since not all requests have access to bug_id,
			// ...this querry gets it using account_id
			const allCommentsForAccount = await pool.query(
				`WITH c AS 
					(SELECT * FROM comment WHERE bug_id IN
						(SELECT bug_id FROM bug WHERE project_id IN 
							(SELECT project_id FROM project WHERE account_id = $1)
						)
					)
				SELECT c.comment_id AS id, c.bug_id, c.description, c.creation_date 
					FROM c
						ORDER BY c.comment_id`,
				[account_id]
			);

			res.json({ success: true, comments: allCommentsForAccount.rows });
		} catch (err) {
			console.error(err.message);
			inputErrors.server = "Server error while updating comment";
			return res.status(500).json({ success: false, inputErrors });
		}
	});

//================
// Delete comment
//================
router.route("/delete").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

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
			throw { message: "Comment, bug and/or project does not belong to account" };
		}

		const deletedComment = await pool.query(
			`DELETE FROM comment WHERE bug_id = $1 AND comment_id = $2`,
			[bug_id, id]
		);

		// Since not all requests have access to bug_id,
		// ...this querry gets it using account_id
		const allCommentsForAccount = await pool.query(
			`WITH c AS 
				(SELECT * FROM comment WHERE bug_id IN
					(SELECT bug_id FROM bug WHERE project_id IN 
						(SELECT project_id FROM project WHERE account_id = $1)
					)
				)
			SELECT c.comment_id AS id, c.bug_id, c.description, c.creation_date 
				FROM c
					ORDER BY c.comment_id`,
			[account_id]
		);

		res.json({ success: true, comments: allCommentsForAccount.rows });
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server error while deleting comment";
		return res.status(500).json({ success: false, inputErrors });
	}
});

module.exports = router;
