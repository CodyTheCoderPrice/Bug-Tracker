const Pool = require("pg").Pool;

const env = process.env.NODE_ENV || "development";

// Used for connection to Postgres database hosted on Heroku
let connectionString = {
	connectionString:
		process.env.DATABASE_URL,
	ssl: false,
};

// If running locally, connection string will be raplced by the following
if (env === "development") {
	// Put your postgres database account info here instead of mine
	connectionString = {
		user: "postgres",
		password: "PostgresEasyPassword",
		host: "localhost",
		port: 5432,
		database: "bugtracker",
	};
}

const pool = new Pool(connectionString);

module.exports = pool;
