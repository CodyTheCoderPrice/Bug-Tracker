const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for creating / updating a comment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { description, isEditing } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		description = !isEmpty(description) ? description : "";

		// Which inputErrors property is set depends on isEditing (new comment or editted one)
		// ...since error will be displayed in different places on frontend accordingly 
		if (!Validator.isLength(description, { min: 1 })) {
			inputErrors[
				isEditing === false
					? "validationCreateCommentDescription"
					: "validationEditCommentDescription"
			] = "Comment can't be empty";
		} else if (!Validator.isLength(description, { max: 500 })) {
			inputErrors[
				isEditing === false
					? "validationCreateCommentDescription"
					: "validationEditCommentDescription"
			] = "Comment can't be longer than 500 characters";
		}

		if (!isEmpty(inputErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, inputErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationComment = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
