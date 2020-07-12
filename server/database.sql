CREATE DATABASE bugtracker;

CREATE TABLE account(
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    hash_pass VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    join_date DATE
);

CREATE TABLE token(
    token_id SERIAL PRIMARY KEY,
    account_id VARCHAR(255),
    secret_code VARCHAR(255),
    date_created DATE,
    date_expires DATE
);

CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
    account_id VARCHAR(255),
    p_name VARCHAR(255),
    P_description VARCHAR(255),
    p_priority SMALLINT,
    deadline DATE,
    date_created DATE
);