CREATE DATABASE frankenstein;
CREATE USER victor WITH PASSWORD 'victor';
GRANT ALL PRIVILEGES ON DATABASE "frankenstein" to this_user;

CREATE TABLE person (person_id UUID NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    birth_date date NOT NULL);