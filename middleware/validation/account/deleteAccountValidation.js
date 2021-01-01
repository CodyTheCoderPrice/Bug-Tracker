const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for deleting an account
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { deleteTypedOut, currentPassword } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		deleteTypedOut = !isEmpty(deleteTypedOut) ? deleteTypedOut : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		if (deleteTypedOut !== "DELETE") {
			inputErrors.validationAccountTypeOutCheck = "Must match: DELETE";
		}

		if (Validator.isEmpty(currentPassword)) {
			inputErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(inputErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, inputErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
