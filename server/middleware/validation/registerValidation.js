const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { email, password, password2, firstName, lastName } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";
		password2 = !isEmpty(password2) ? password2 : "";
		firstName = !isEmpty(firstName) ? firstName : "";
		lastName = !isEmpty(lastName) ? lastName : "";

		// Email checks
		if (Validator.isEmpty(email)) {
			inputErrors.email = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			inputErrors.email = "Email is invalid";
		}

		// Password checks
		if (!Validator.isLength(password, { min: 6, max: 30 })) {
			inputErrors.password = "Password must be 6-30 characters long";
		}
		if (!Validator.equals(password, password2)) {
			inputErrors.password = "Passwords must match";
			inputErrors.password2 = "Passwords must match";
		}
		if (Validator.isEmpty(password)) {
			inputErrors.password = "Password field is required";
		}
		if (Validator.isEmpty(password2)) {
			inputErrors.password2 = "Confirm password field is required";
		}

		// First name checks
		if (Validator.isEmpty(firstName)) {
			inputErrors.firstName = "First name field is required";
		}
		if (!Validator.isLength(firstName, { max: 35 })) {
			inputErrors.firstName= "First name can't be longer than 35 characters";
		}

		// Last name checks
		if (Validator.isEmpty(lastName)) {
			inputErrors.lastName = "Last name field is required";
		}
		if (!Validator.isLength(lastName, { max: 35 })) {
			inputErrors.lastName = "Last name can't be longer than 35 characters";
		}

		if (!isEmpty(inputErrors)) {
			return res.status(400).json({ success: true, inputErrors });
		}

		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validation = "Validation Error";
		return res.status(403).json({ success: true, inputErrors });
	}
};
