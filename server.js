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
const priorityStatus = require("./routes/priorityStatus");
const accounts = require("./routes/accounts");
const projects = require("./routes/projects");
const bugs = require("./routes/bugs");
const comments = require("./routes/comments");

// Middleware
app.use(express.json());

// Was being used when trying to use HTTPS
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

// Was being used when trying to use HTTPS
/* const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(httpPort);
httpsServer.listen(httpsPort); */

app.listen(process.env.PORT || 5000, () => {
	console.log("Server has started on port 5000");
});
