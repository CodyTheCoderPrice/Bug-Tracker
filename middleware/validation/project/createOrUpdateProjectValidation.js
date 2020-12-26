const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { name, description, priority_id, status_id } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		name = !isEmpty(name) ? name : "";
		description = !isEmpty(description) ? description : "";
		priority_id = !isEmpty(priority_id) ? priority_id : "";
		status_id = !isEmpty(status_id) ? status_id : "";

		if (Validator.isEmpty(name)) {
			inputErrors.validationItemName = "Name field is required";
		} else if (!Validator.isLength(name, { max: 35 })) {
			inputErrors.validationItemName =
				"Name can't be longer than 35 characters";
		}

		if (!Validator.isLength(description, { max: 500 })) {
			inputErrors.validationItemDescription =
				"Description can't be longer than 500 characters";
		}

		if (!isEmpty(inputErrors)) {
			return res.status(400).json({ success: false, inputErrors });
		}

		// If no inputErrors were found, calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationItem = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
