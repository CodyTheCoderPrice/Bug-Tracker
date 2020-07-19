const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
	let inputErrors = {};

	try {
		const jwToken = req.header("jwToken");

		console.log(jwToken);

		if (!jwToken) {
			inputErrors.jwToken = "No jwToken";
			return res.status(403).json({ success: false, inputErrors });
		}

		const payload = jwt.verify(jwToken, process.env.jwtSecret);

		req.accountId = payload.accountId;
		next();
	} catch (err) {
		console.error(err.message);
		inputErrors.jwToken = "jwToken verify error";
		return res.status(403).json({ success: false, inputErrors });
	}
};
