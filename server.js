// Express
const express = require("express");
const app = express();
// Http & https
/* const fs = require("fs");
//const http = require("http");
const https = require("https");
//const httpPort = 8080;
const httpsPort = process.env.PORT || 8443;
const privateKey = fs.readFileSync("./sslCertification/selfsigned.key", "utf8");
const certificate = fs.readFileSync("./sslCertification/selfsigned.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
// URL
const url = require("url"); */
// Routes
const priorityStatus = require("./routes/priorityStatus");
const accounts = require("./routes/accounts");
const projects = require("./routes/projects");
const bugs = require("./routes/bugs");
const comments = require("./routes/comments");

// Middleware
app.use(express.json());
/* app.use(function (req, res, next) {
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
		res.redirect("https://" + req.headers.host + req.url);
	}
}); */

/* app.all('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
        res.redirect('https://' + req.headers.host + req.url)
    else
        next()
}); */

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Set routes
app.use("/api/priority-status", priorityStatus);
app.use("/api/account", accounts);
app.use("/api/project", projects);
app.use("/api/bug", bugs);
app.use("/api/comment", comments);

/* //const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

//httpServer.listen(httpPort);
httpsServer.listen(httpsPort); */

// Was using before switching to https
app.listen(process.env.PORT || 5000, () => {
	console.log("Server has started on port 5000");
});
