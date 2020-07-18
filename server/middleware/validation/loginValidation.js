const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { email, password } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";

		// Email checks
		if (Validator.isEmpty(email)) {
			inputErrors.email = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			inputErrors.email = "Email is invalid";
		}
		// Password checks
		if (Validator.isEmpty(password)) {
			inputErrors.password = "Password field is required";
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
