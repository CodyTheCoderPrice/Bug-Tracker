const Pool = require("pg").Pool;

const env = process.env.NODE_ENV || "development";

let connectionString = {
	connectionString:
		process.env.DATABASE_URL,
	ssl: true,
};

/* connectionString.connectionString =
	connectionString.connectionString + "?ssl=true"; */

/* if (env === "development") {
	connectionString = {
		user: "postgres",
		password: "PostgresEasyPassword",
		host: "localhost",
		port: 5432,
		database: "bugtracker",
	};
} */

const pool = new Pool(connectionString);

module.exports = pool;
