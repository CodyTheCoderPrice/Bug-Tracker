const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { start_date, due_date, completion_date } = req.body;

		start_date = !isEmpty(start_date) ? start_date : null;
		due_date =  !isEmpty(due_date) ? due_date  : null;
		completion_date = !isEmpty(completion_date) ? completion_date  : null;

		req.body.start_date = start_date;
		req.body.due_date = due_date;
		req.body.completion_date = completion_date;

		// Calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};