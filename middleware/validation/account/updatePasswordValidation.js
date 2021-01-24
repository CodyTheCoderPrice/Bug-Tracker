const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for updating account password
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let backendErrors = {};

	try {
		let { newPassword, newPassword2, currentPassword } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		newPassword = !isEmpty(newPassword) ? newPassword : "";
		newPassword2 = !isEmpty(newPassword2) ? newPassword2 : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		if (Validator.isEmpty(newPassword)) {
			backendErrors.validationAccountNewPassword = "New password field is required";
		} else if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
			backendErrors.validationAccountNewPassword =
				"New password must be 6-30 characters long";
		}

		if (Validator.isEmpty(newPassword2)) {
			backendErrors.validationAccountNewPassword2 =
				"Confirm new password field is required";
		} else if (!Validator.equals(newPassword, newPassword2)) {
			backendErrors.validationAccountNewPassword2 = "New passwords must match";
		}

		// Check for whether password is correct is done in the next middleware
		if (Validator.isEmpty(currentPassword)) {
			backendErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(backendErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, backendErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		backendErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, backendErrors });
	}
};
