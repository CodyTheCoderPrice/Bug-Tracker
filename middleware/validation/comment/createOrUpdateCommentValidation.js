const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for creating / updating a comment
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let errorMessages = {};

	try {
		let { description, isEditing } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		description = !isEmpty(description) ? description : "";

		// Which errorMessages property is set depends on isEditing. Since 
		// ...errors for new comments are displayed in different place on 
		// ...frontend than comments being edited 
		if (!Validator.isLength(description, { min: 1 })) {
			errorMessages[
				isEditing === false
					? "validationCreateCommentDescription"
					: "validationEditCommentDescription"
			] = "Comment is empty";
		} else if (!Validator.isLength(description, { max: 500 })) {
			errorMessages[
				isEditing === false
					? "validationCreateCommentDescription"
					: "validationEditCommentDescription"
			] = "Comment longer than 500 characters";
		}

		if (!isEmpty(errorMessages)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, errorMessages });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		errorMessages.validationComment = "Validation Error";
		return res.status(403).json({ success: false, errorMessages });
	}
};
