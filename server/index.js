const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const accounts = require("./routes/accounts");

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use("/api/account", accounts);

app.listen(5000, () => {
	console.log("Server has started on port 5000");
});
