const Validator = require("validator");
const isEmpty = require("is-empty");

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
			return res.status(400).json({ success: false, inputErrors });
		}

		// If no inputErrors were found, calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationComment = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
