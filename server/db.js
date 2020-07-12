const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "PostgresEasyPassword",
    host: "localhost",
    port: 5432,
    database: "bugtracker"
});

module.exports = pool;