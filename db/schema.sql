DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

-- Create tables
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL
    department INT REFERENCES department(id) 
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT REFERENCES role(id),
    manager_id INT REFERENCES employee(id) ON DELETE SET NULL
);
