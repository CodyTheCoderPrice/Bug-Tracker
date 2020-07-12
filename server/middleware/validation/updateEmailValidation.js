const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	try {
		let { email, currentPassword } = req.body;
		let formInputErrors = {};

		// Convert empty fields to an empty string so we can use validator functions
		email = !isEmpty(email) ? email : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		// Email checks
		if (Validator.isEmpty(email)) {
			formInputErrors.email = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			formInputErrors.email = "Email is invalid";
		}
		// currentPassword checks
		if (Validator.isEmpty(currentPassword)) {
			formInputErrors.currentPassword = "Current Password field is required";
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
