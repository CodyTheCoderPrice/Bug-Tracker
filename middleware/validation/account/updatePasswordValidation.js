const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { newPassword, newPassword2, currentPassword } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		newPassword = !isEmpty(newPassword) ? newPassword : "";
		newPassword2 = !isEmpty(newPassword2) ? newPassword2 : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		if (Validator.isEmpty(newPassword)) {
			inputErrors.validationAccountNewPassword = "New password field is required";
		} else if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
			inputErrors.validationAccountNewPassword =
				"New password must be 6-30 characters long";
		}

		if (Validator.isEmpty(newPassword2)) {
			inputErrors.validationAccountNewPassword2 =
				"Confirm new password field is required";
		} else if (!Validator.equals(newPassword, newPassword2)) {
			inputErrors.validationAccountNewPassword2 = "New passwords must match";
		}

		// Check for whether password is correct is done in the next middleware
		if (Validator.isEmpty(currentPassword)) {
			inputErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(inputErrors)) {
			return res.status(400).json({ success: false, inputErrors });
		}

		// If no inputErrors were found, calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
