const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { first_name, last_name } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		first_name = !isEmpty(first_name) ? first_name : "";
		last_name = !isEmpty(last_name) ? last_name : "";

		if (Validator.isEmpty(first_name)) {
			inputErrors.validationAccountFirstName = "First name field is required";
		} else if (!Validator.isLength(first_name, { max: 35 })) {
			inputErrors.validationAccountFirstName = "First name can't be longer than 35 characters";
		}

		if (Validator.isEmpty(last_name)) {
			inputErrors.validationAccountLastName = "Last name field is required";
		} else if (!Validator.isLength(last_name, { max: 35 })) {
			inputErrors.validationAccountLastName = "Last name can't be longer than 35 characters";
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