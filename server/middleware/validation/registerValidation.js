const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	try {
		let { email, password, password2, firstName, lastName } = req.body;
		let formInputErrors = {};

		// Convert empty fields to an empty string so we can use validator functions
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";
		password2 = !isEmpty(password2) ? password2 : "";
		firstName = !isEmpty(firstName) ? firstName : "";
		lastName = !isEmpty(lastName) ? lastName : "";

		// Email checks
		if (Validator.isEmpty(email)) {
			formInputErrors.email = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			formInputErrors.email = "Email is invalid";
		}

		// Password checks
		if (Validator.isEmpty(password)) {
			formInputErrors.password = "Password field is required";
		}
		if (Validator.isEmpty(password2)) {
			formInputErrors.password2 = "Confirm password field is required";
		}
		if (!Validator.isLength(password, { min: 6, max: 30 })) {
			formInputErrors.password = "Password must be 6-30 characters long";
		}
		if (!Validator.equals(password, password2)) {
			formInputErrors.password = "Passwords must match";
			formInputErrors.password2 = "Passwords must match";
		}

		// First name checks
		if (Validator.isEmpty(firstName)) {
			formInputErrors.firstName = "First name field is required";
		}
		if (!Validator.isLength(firstName, { min: 1, max: 35 })) {
			formInputErrors.password = "First name can't be longer than 35 characters";
		}

		// Last name checks
		if (Validator.isEmpty(lastName)) {
			formInputErrors.lastName = "Last name field is required";
		}
		if (!Validator.isLength(lastName, { min: 1, max: 35 })) {
			formInputErrors.password = "Last name can't be longer than 35 characters";
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
