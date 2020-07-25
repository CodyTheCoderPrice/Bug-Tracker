const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { newPassword, newPassword2, currentPassword } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		newPassword = !isEmpty(newPassword) ? newPassword : "";
		newPassword2 = !isEmpty(newPassword2) ? newPassword2 : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		// newPassword checks
		if (Validator.isEmpty(newPassword)) {
			inputErrors.newPassword = "Password field is required";
		}
		if (Validator.isEmpty(newPassword2)) {
			inputErrors.newPassword2 = "Confirm password field is required";
		}
		if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
			inputErrors.newPassword = "Password must be 6-30 characters long";
		}
		if (!Validator.equals(newPassword, newPassword2)) {
			inputErrors.newPassword = "Passwords must match";
			inputErrors.newPassword2 = "Passwords must match";
		}

		// currentPassword checks
		if (Validator.isEmpty(currentPassword)) {
			inputErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(inputErrors)) {
			return res.status(400).json({ success: false, inputErrors });
		}
		
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validation = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
