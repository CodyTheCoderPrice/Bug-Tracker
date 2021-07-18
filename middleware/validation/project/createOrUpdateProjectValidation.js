const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for creating / updating a project
 * 
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one 
 */
module.exports = (req, res, next) => {
	let backendErrors = {};

	try {
		let { name, description, priority_id, status_id } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		name = !isEmpty(name) ? name : "";
		description = !isEmpty(description) ? description : "";
		priority_id = !isEmpty(priority_id) ? priority_id : "";
		status_id = !isEmpty(status_id) ? status_id : "";

		if (Validator.isEmpty(name)) {
			backendErrors.validationItemName = "Name required";
		} else if (!Validator.isLength(name, { max: 35 })) {
			backendErrors.validationItemName =
				"Name longer than 35 characters";
		}

		if (!Validator.isLength(description, { max: 500 })) {
			backendErrors.validationItemDescription =
				"Description longer than 500 characters";
		}

		if (!isEmpty(backendErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, backendErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		backendErrors.validationItem = "Validation Error";
		return res.status(403).json({ success: false, backendErrors });
	}
};
