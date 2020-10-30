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

			const bugAndProjectBelongsToAccountCheck = await pool.query(
				`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
						(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id = $3)`,
				[account_id, project_id, bug_id]
			);

			if (bugAndProjectBelongsToAccountCheck.rowCount === 0) {
				throw { message: "Bug and/or project does not belong to account" };
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

		const bugAndProjectBelongsToAccountCheck = await pool.query(
			`SELECT * FROM project WHERE account_id = $1 AND project_id IN 
					(SELECT project_id FROM bug WHERE project_id = $2 AND bug_id = $3)`,
			[account_id, project_id, bug_id]
		);

		if (bugAndProjectBelongsToAccountCheck.rowCount === 0) {
			throw { message: "Bug and/or project does not belong to account" };
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

//=======================
// Delete multiple comments
//=======================
router.route("/delete-multiple").post(tokenAuthorization, async (req, res) => {
	let inputErrors = {};

	try {
		// Declared in the tokenAuthorization middleware
		const { account_id } = req;
		// Passed in the post body
		const { commentsArray } = req.body;

		let commentArrayQueryString = "";

		for (let i = 1; i < commentsArray.length + 1; i++) {
			commentArrayQueryString += "$" + i;
			if (i < commentsArray.length) {
				commentArrayQueryString += ", ";
			}
		}

		const projectBelongsToAccountCheck = await pool.query(
			`WITH p AS (SELECT project_id FROM comment WHERE comment_id IN (${commentArrayQueryString}))
			SELECT account_id FROM project WHERE project_id IN (SELECT project_id FROM p)`,
			[...commentsArray]
		);

		if (
			projectBelongsToAccountCheck.rowCount !== 1 ||
			projectBelongsToAccountCheck.rows[0].account_id !== account_id
		) {
			throw { message: "Comment does not belong to account" };
		}

		const deletedComment = await pool.query(
			`DELETE FROM comment WHERE comment_id IN (${commentArrayQueryString})`,
			[...commentsArray]
		);

		const allCommentsForAccount = await pool.query(
			`WITH b AS 
				(SELECT * FROM comment WHERE project_id IN 
					(SELECT project_id FROM project WHERE account_id = $1)
				)
			SELECT c.comment_id AS id, c.project_id, c.name, c.description, c.location,
				c.b_priority_id AS priority_id, c.b_status_id AS status_id,
				 c.creation_date, c.start_date, c.due_date,
				c.completion_date, bp.option AS priority_option, 
				bs.option AS status_option
					FROM b, comment_priority bp, comment_status bs 
						WHERE (c.b_priority_id = bp.b_priority_id) 
							AND (c.b_status_id = bs.b_status_id)
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
