const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for updating account password
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let errorMessages = {};

	try {
		let { newPassword, currentPassword } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		newPassword = !isEmpty(newPassword) ? newPassword : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		if (Validator.isEmpty(newPassword)) {
			errorMessages.validationAccountNewPassword = "New password required";
		} else if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
			errorMessages.validationAccountNewPassword =
				"New password not between 6-30 characters";
		}

		// Check for whether password is correct is done in the next middleware
		if (Validator.isEmpty(currentPassword)) {
			errorMessages.currentPassword = "Current password required";
		}

		if (!isEmpty(errorMessages)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, errorMessages });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		errorMessages.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, errorMessages });
	}
};
