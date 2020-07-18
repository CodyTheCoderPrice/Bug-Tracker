const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { firstName, lastName } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		firstName = !isEmpty(firstName) ? firstName : "";
		lastName = !isEmpty(lastName) ? lastName : "";

		// First name checks
		if (Validator.isEmpty(firstName)) {
			inputErrors.firstName = "First name field is required";
		}
		if (!Validator.isLength(firstName, { max: 35 })) {
			inputErrors.firstName = "First name can't be longer than 35 characters";
		}


		// Last name checks
		if (Validator.isEmpty(lastName)) {
			inputErrors.lastName = "Last name field is required";
		}
		if (!Validator.isLength(lastName, { max: 35 })) {
			inputErrors.lastName = "Last name can't be longer than 35 characters";
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