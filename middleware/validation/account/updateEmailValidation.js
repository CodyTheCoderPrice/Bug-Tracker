const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { email, currentPassword } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		email = !isEmpty(email) ? email : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		// Email check
		if (Validator.isEmpty(email)) {
			inputErrors.validationAccountEmail = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			inputErrors.validationAccountEmail = "Email is invalid";
		}
		// currentPassword check
		if (Validator.isEmpty(currentPassword)) {
			inputErrors.currentPassword = "Current password field is required";
		}

		if (!isEmpty(inputErrors)) {
			return res.status(400).json({ success: false, inputErrors });
		}

		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
