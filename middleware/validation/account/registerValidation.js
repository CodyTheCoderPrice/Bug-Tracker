const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for regestering an account
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { email, password, password2, first_name, last_name } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";
		password2 = !isEmpty(password2) ? password2 : "";
		first_name = !isEmpty(first_name) ? first_name : "";
		last_name = !isEmpty(last_name) ? last_name : "";

		if (Validator.isEmpty(first_name)) {
			inputErrors.validationAccountFirstName = "First name field is required";
		} else if (!Validator.isLength(first_name, { max: 35 })) {
			inputErrors.validationAccountFirstName =
				"First name can't be longer than 35 characters";
		}

		if (Validator.isEmpty(last_name)) {
			inputErrors.validationAccountLastName = "Last name field is required";
		} else if (!Validator.isLength(last_name, { max: 35 })) {
			inputErrors.validationAccountLastName =
				"Last name can't be longer than 35 characters";
		}

		if (Validator.isEmpty(email)) {
			inputErrors.validationAccountEmail = "Email field is required";
		} else if (!Validator.isEmail(email)) {
			inputErrors.validationAccountEmail = "Email is invalid";
		}

		if (Validator.isEmpty(password)) {
			inputErrors.validationAccountPassword = "Password field is required";
		} else if (!Validator.isLength(password, { min: 6, max: 30 })) {
			inputErrors.validationAccountPassword =
				"Password must be 6-30 characters long";
		}

		if (Validator.isEmpty(password2)) {
			inputErrors.validationAccountPassword2 =
				"Confirm password field is required";
		} else if (!Validator.equals(password, password2)) {
			inputErrors.validationAccountPassword2 = "Passwords must match";
		}

		if (!isEmpty(inputErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, inputErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
