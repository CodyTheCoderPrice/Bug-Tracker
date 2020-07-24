// express
const express = require("express");
const app = express();
// http & https
const fs = require("fs");
const http = require("http");
const https = require("https");
const httpPort = 8080;
const httpsPort = 8443;
var privateKey = fs.readFileSync("./sslCertification/selfsigned.key", "utf8");
var certificate = fs.readFileSync("./sslCertification/selfsigned.crt", "utf8");
var credentials = { key: privateKey, cert: certificate };
// routes
const accounts = require("./routes/accounts");
const projects = require("./routes/projects");

// Middleware
app.use(express.json());
app.use(function (req, res, next) {
	if (req.secure) {
		// request was via https, so do no special handling
		console.log("Was secure!");
		next();
	} else {
		// request was via http, so redirect to https
		console.log("Switched to https");
		next();
		//res.redirect("https://" + req.headers.host + req.url);
	}
});

// set routes
app.use("/api/account", accounts);
app.use("/api/project", projects);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

/* app.listen(5000, () => {
	console.log("Server has started on port 5000");
}); */
