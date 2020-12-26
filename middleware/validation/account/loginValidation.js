const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { email, password } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";

		if (Validator.isEmpty(email)) {
			inputErrors.validationAccountEmail = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			inputErrors.validationAccountEmail = "Email is invalid";
		}

		if (Validator.isEmpty(password)) {
			inputErrors.validationAccountPassword = "Password field is required";
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
