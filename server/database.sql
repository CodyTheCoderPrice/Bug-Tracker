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
	p_priority_id SMALLINT NOT NULL,
	p_status_id SMALLINT NOT NULL,
	creation_date DATE,
	start_date DATE,
    due_date DATE,
    completion_date DATE,
	CONSTRAINT fk_account
    FOREIGN KEY(account_id) 
	REFERENCES account(account_id)
	ON DELETE CASCADE,
	CONSTRAINT fk_project_priority
	FOREIGN KEY(p_priority_id) 
	REFERENCES project_priority(p_priority_id)
	ON DELETE SET NULL,
	CONSTRAINT fk_project_status
    FOREIGN KEY(p_status_id) 
	REFERENCES project_status(p_status_id)
	ON DELETE SET NULL
);

CREATE TABLE project_priority(
	p_priority_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT
);

INSERT INTO project_priority (order_number, option)
	VALUES 
		(0, ''),
		(1, 'Low'),
		(2, 'Medium'),
		(3, 'High');

CREATE TABLE project_status(
	p_status_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT,
	marks_completion BOOLEAN DEFAULT false
);

INSERT INTO bug_status (order_number, option, marks_completion)
	VALUES
		(0, '', false);
		(1, 'Planning', false),
		(2, 'Developing', false),
		(3, 'Testing', false),
		(4, 'Completed', true);
		(5, 'On Hold', false);

CREATE TABLE bug(
    bug_id SERIAL PRIMARY KEY,
    project_id INTEGER,
    name VARCHAR(255),
    description TEXT,
	location TEXT,
	b_priority_id SMALLINT NOT NULL,
	b_status_id SMALLINT NOT NULL,
	creation_date DATE,
	start_date DATE,
    due_date DATE,
    completion_date DATE,
	CONSTRAINT fk_project
    FOREIGN KEY(project_id) 
	REFERENCES project(project_id)
	ON DELETE CASCADE,
	CONSTRAINT fk_bug_priority
	FOREIGN KEY(b_priority_id) 
	REFERENCES bug_priority(b_priority_id)
	ON DELETE SET NULL,
	CONSTRAINT fk_bug_status
    FOREIGN KEY(b_status_id) 
	REFERENCES bug_status(b_status_id)
	ON DELETE SET NULL
);

CREATE TABLE bug_priority(
	b_priority_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT
);

INSERT INTO bug_priority (order_number, option)
	VALUES 
		(0, ''),
		(1, 'Low'),
		(2, 'Medium'),
		(3, 'High');


CREATE TABLE bug_status(
	b_status_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT,
	marks_completion BOOLEAN DEFAULT false
);

INSERT INTO bug_status (order_number, option, marks_completion)
	VALUES 
		(0, 'Open', false),
		(1, 'In Progress', false),
		(2, 'Testing', false),
		(3, 'Closed', true);