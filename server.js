// Express
const express = require("express");
const app = express();
// Http & https
/* const fs = require("fs");
const http = require("http");
const https = require("https");
const httpPort = 8080;
const httpsPort = process.env.PORT || 8443;
const privateKey = fs.readFileSync("./sslCertification/selfsigned.key", "utf8");
const certificate = fs.readFileSync("./sslCertification/selfsigned.crt", "utf8");
const credentials = { key: privateKey, cert: certificate }; */
// Routes
const { referenceDataRouter } = require("./routes/referenceData");
const { accountRouter } = require("./routes/accounts");
const { projectRouter } = require("./routes/projects");
const { bugRouter } = require("./routes/bugs");
const { commentRouter } = require("./routes/comments");

// Middleware
app.use(express.json());

// Was being used when trying to use HTTPS
/* app.all('*', function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https')
        res.redirect('https://' + req.headers.host + req.url)
    else
        next()
}); */

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

// Set routes
app.use("/api/reference-data", referenceDataRouter);
app.use("/api/account", accountRouter);
app.use("/api/project", projectRouter);
app.use("/api/bug", bugRouter);
app.use("/api/comment", commentRouter);

// Was being used when trying to use HTTPS
/* const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(httpPort);
httpsServer.listen(httpsPort); */

app.listen(process.env.PORT || 5000, () => {
	console.log("Server has started on port 5000");
});
