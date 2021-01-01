const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for creating / updating a bug
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { name, description, location, priority_id, status_id } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		name = !isEmpty(name) ? name : "";
		description = !isEmpty(description) ? description : "";
		location = !isEmpty(location) ? location : "";
		priority_id = !isEmpty(priority_id) ? priority_id : "";
		status_id = !isEmpty(status_id) ? status_id : "";

		if (Validator.isEmpty(name)) {
			inputErrors.validationItemName = "Name field is required";
		} else if (!Validator.isLength(name, { max: 35 })) {
			inputErrors.validationItemName = "Name can't be longer than 35 characters";
		}

		if (!Validator.isLength(location, { max: 100 })) {
			inputErrors.validationItemLocation = "Location can't be longer than 100 characters";
		}

		if (!Validator.isLength(description, { max: 500 })) {
			inputErrors.validationItemDescription =
				"Description can't be longer than 500 characters";
		}

		if (!isEmpty(inputErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, inputErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.validationItem = "Validation Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
