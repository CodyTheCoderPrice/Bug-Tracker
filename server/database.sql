CREATE DATABASE bugtracker;

CREATE TABLE account(
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    hash_pass VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    join_date DATE
);

CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
    account_id INTEGER,
    name VARCHAR(255),
    description TEXT,
	priority SMALLINT,
	status SMALLINT,
	creation_date DATE,
	start_date DATE,
    due_date DATE,
    completion_date DATE
);