// Express
const express = require("express");
const app = express();
// Http & https
const fs = require("fs");
const http = require("http");
const https = require("https");
const httpPort = 8080;
const httpsPort = 8443;
var privateKey = fs.readFileSync("./sslCertification/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./sslCertification/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };
// URL
const url = require("url");
// Routes
const priorityStatus = require("./routes/priorityStatus");
const accounts = require("./routes/accounts");
const projects = require("./routes/projects");
const bugs = require("./routes/bugs");

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
	if (req.secure) {
		// Request was via https, so do no special handling
		console.log(
			"Was secure --> " +
				url.format({
					protocol: req.protocol,
					host: req.get("host"),
					pathname: req.originalUrl,
				})
		);
		next();
	} else {
		// Request was via http, so redirect to https
		console.log("Switched to https");
		next();
		//res.redirect("https://" + req.headers.host + req.url);
	}
});

// Set routes
app.use("/api/priority-status", priorityStatus);
app.use("/api/account", accounts);
app.use("/api/project", projects);
app.use("/api/bug", bugs);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

// Maybe be unneeded
/* app.listen(5000, () => {
	console.log("Server has started on port 5000");
}); */
