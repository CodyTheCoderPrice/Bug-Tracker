const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	try {
		let { newPassword, newPassword2, currentPassword } = req.body;
		let formInputErrors = {};

		// Convert empty fields to an empty string so we can use validator functions
		newPassword = !isEmpty(newPassword) ? newPassword : "";
		newPassword2 = !isEmpty(newPassword2) ? newPassword2 : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		// newPassword checks
		if (Validator.isEmpty(newPassword)) {
			formInputErrors.newPassword = "Password field is required";
		}
		if (Validator.isEmpty(newPassword2)) {
			formInputErrors.newPassword2 = "Confirm password field is required";
		}
		if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
			formInputErrors.newPassword = "Password must be 6-30 characters long";
		}
		if (!Validator.equals(newPassword, newPassword2)) {
			formInputErrors.newPassword = "Passwords must match";
			formInputErrors.newPassword2 = "Passwords must match";
		}

		// currentPassword checks
		if (Validator.isEmpty(currentPassword)) {
			formInputErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(formInputErrors)) {
			return res.status(400).json({ success: false, formInputErrors });
		}
		
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(403).json("Validation Error");
	}
};
