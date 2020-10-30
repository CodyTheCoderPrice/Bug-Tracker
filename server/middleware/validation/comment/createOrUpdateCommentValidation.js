const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { description } = req.body;

		// Convert empty fields to an empty string so we can use validator functions
		description = !isEmpty(description) ? description : "";

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
