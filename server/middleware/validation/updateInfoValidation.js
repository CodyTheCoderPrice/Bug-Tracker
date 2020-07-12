const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	try {
		let { firstName, lastName } = req.body;
		let formInputErrors = {};

		// Convert empty fields to an empty string so we can use validator functions
		firstName = !isEmpty(firstName) ? firstName : "";
		lastName = !isEmpty(lastName) ? lastName : "";

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