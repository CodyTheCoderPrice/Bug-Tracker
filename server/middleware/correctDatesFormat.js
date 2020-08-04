const isEmpty = require("is-empty");

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		let { startDate, dueDate, completionDate } = req.body;

		startDate = isEmpty(startDate) ? null : startDate;
		dueDate =  isEmpty(dueDate) ? null : dueDate;
		completionDate = isEmpty(completionDate) ? null : completionDate;

		req.body.startDate = startDate;
		req.body.dueDate = dueDate;
		req.body.completionDate = completionDate;

		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.server = "Server Error";
		return res.status(403).json({ success: false, inputErrors });
	}
};