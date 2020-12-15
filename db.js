const Pool = require("pg").Pool;

const env = process.env.NODE_ENV || "development";

let connectionString = {
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://lmnvyisyarebvk:0f978c7d5ad47aa50a1549a2466f2817c2f338f2632ea8175cdfb7eee53bb0dd@ec2-3-231-48-230.compute-1.amazonaws.com:5432/ddk6a1prc8hit2",
	//ssl: false,
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
