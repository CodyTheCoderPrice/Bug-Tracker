const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { deleteTypedOut, currentPassword } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		deleteTypedOut = !isEmpty(deleteTypedOut) ? deleteTypedOut : "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		// Delete Typed Out checks
		if (Validator.isEmpty(deleteTypedOut)) {
			inputErrors.deleteTypedOut = "This field is required";
		} else if (deleteTypedOut !== "DELETE") {
			inputErrors.deleteTypedOut = "Must type: DELETE";
		}
		// currentPassword checks
		if (Validator.isEmpty(currentPassword)) {
			inputErrors.currentPassword = "Current password field is required";
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