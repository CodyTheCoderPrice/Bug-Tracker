CREATE DATABASE bugtracker;

CREATE TABLE account(
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    hash_pass VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    join_date DATE,
	last_edited_timestamp BIGINT
);

CREATE TABLE theme(
	theme_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	color TEXT,
	marks_default BOOLEAN DEFAULT false
);

CREATE TABLE setting(
    setting_id SERIAL PRIMARY KEY,
    account_id INTEGER,
    filter_completed_projects boolean,
	filter_completed_bugs boolean,
    dark_mode boolean,
	theme_id INTEGER DEFAULT 1,
	last_edited_timestamp BIGINT,
	CONSTRAINT fk_account
    FOREIGN KEY(account_id) 
	REFERENCES account(account_id)
	ON DELETE CASCADE,
	CONSTRAINT fk_theme
	FOREIGN KEY(theme_id) 
	REFERENCES theme(theme_id)
	ON DELETE SET DEFAULT
);

INSERT INTO theme (order_number, color, marks_default)
	VALUES 
		(0, 'Navy Blue', true),
		(1, 'Teal', false);

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
	last_edited_timestamp BIGINT,
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
	option TEXT,
	marks_empty BOOLEAN DEFAULT false
);

INSERT INTO project_priority (order_number, option, marks_empty)
	VALUES 
		(0, 'None', true),
		(1, 'Low', false),
		(2, 'Medium', false),
		(3, 'High', false);

CREATE TABLE project_status(
	p_status_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT,
	color TEXT,
	marks_empty BOOLEAN DEFAULT false,
	marks_completion BOOLEAN DEFAULT false
);

INSERT INTO project_status (order_number, option, color, marks_empty, marks_completion)
	VALUES
		(0, 'None', 'gray', true, false),
		(1, 'On Hold', 'red', false, false),
		(2, 'Planning', 'blue', false, false),
		(3, 'Developing', 'purple', false, false),
		(4, 'Testing', 'orange', false, false),
		(5, 'Completed', 'green', false, true);

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
	last_edited_timestamp BIGINT,
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
	option TEXT,
	marks_empty BOOLEAN DEFAULT false
);

INSERT INTO bug_priority (order_number, option, marks_empty)
	VALUES 
		(0, 'None', true),
		(1, 'Low', false),
		(2, 'Medium', false),
		(3, 'High', true);


CREATE TABLE bug_status(
	b_status_id SERIAL PRIMARY KEY,
	order_number SMALLINT,
	option TEXT,
	color TEXT,
	marks_empty BOOLEAN DEFAULT false,
	marks_completion BOOLEAN DEFAULT false
);

INSERT INTO bug_status (order_number, option, color, marks_empty, marks_completion)
	VALUES 
		(0, 'Open', 'blue', false, false),
		(1, 'In Progress', 'purple', false, false),
		(2, 'Testing', 'orange', false, false),
		(3, 'Closed', 'green', false, true);

CREATE TABLE comment(
    comment_id SERIAL PRIMARY KEY,
    bug_id INTEGER,
    description TEXT,
	creation_date DATE,
	last_edited_timestamp BIGINT,
	CONSTRAINT fk_bug
    FOREIGN KEY(bug_id) 
	REFERENCES bug(bug_id)
	ON DELETE CASCADE
);