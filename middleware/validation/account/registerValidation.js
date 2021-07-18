const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for regestering an account
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let backendErrors = {};

	try {
		let { email, password, first_name, last_name } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		email = !isEmpty(email) ? email : "";
		password = !isEmpty(password) ? password : "";
		first_name = !isEmpty(first_name) ? first_name : "";
		last_name = !isEmpty(last_name) ? last_name : "";

		if (Validator.isEmpty(first_name)) {
			backendErrors.validationAccountFirstName = "First name required";
		} else if (!Validator.isLength(first_name, { max: 35 })) {
			backendErrors.validationAccountFirstName =
				"First name longer than 35 characters";
		}

		if (Validator.isEmpty(last_name)) {
			backendErrors.validationAccountLastName = "Last name required";
		} else if (!Validator.isLength(last_name, { max: 35 })) {
			backendErrors.validationAccountLastName =
				"Last name longer than 35 characters";
		}

		if (Validator.isEmpty(email)) {
			backendErrors.validationAccountEmail = "Email required";
		} else if (!Validator.isEmail(email)) {
			backendErrors.validationAccountEmail = "Email is invalid";
		}

		if (Validator.isEmpty(password)) {
			backendErrors.validationAccountPassword = "Password required";
		} else if (!Validator.isLength(password, { min: 6, max: 30 })) {
			backendErrors.validationAccountPassword =
				"Password not between 6-30 characters";
		}

		if (!isEmpty(backendErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, backendErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		backendErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, backendErrors });
	}
};
