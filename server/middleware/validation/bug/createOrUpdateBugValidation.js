const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let {
			name,
			description,
			location,
			priority_id,
			status_id,
		} = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		name = !isEmpty(name) ? name : "";
		description = !isEmpty(description) ? description : "";
		location = !isEmpty(location) ? location : "";
		priority_id = !isEmpty(priority_id) ? priority_id : "";
		status_id = !isEmpty(status_id) ? status_id : "";

		// Name check
		if (Validator.isEmpty(name)) {
			inputErrors.name = "Name field is required";
		} else if (!Validator.isLength(name, { max: 35 })) {
			inputErrors.name = "Name can't be longer than 35 characters";
		}

		// Location check
		if (!Validator.isLength(location, { max: 100 })) {
			inputErrors.location =
				"Location can't be longer than 100 characters";
		}

		// Description check
		if (!Validator.isLength(description, { max: 500 })) {
			inputErrors.description =
				"Description can't be longer than 500 characters";
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
