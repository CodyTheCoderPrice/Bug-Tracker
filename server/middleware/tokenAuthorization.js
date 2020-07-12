const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	try {
		const jwToken = req.header("token");

		if(!jwToken){
			return res.status(403).json("Not Authorized");
		}

		const payload = jwt.verify(jwToken, process.env.jwtSecret);

		req.accountId = payload.accountId;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(403).json("Not Authorized");
	}
};
