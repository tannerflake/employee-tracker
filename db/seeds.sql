-- Seed data for department
INSERT INTO department (name)
VALUES 
('Human Resources'),
('Engineering'),
('Finance'),
('Sales'),
('Marketing');

-- Seed data for role
INSERT INTO role (title, salary, department)
VALUES
('HR Manager', 70000, 1),
('Software Engineer', 90000, 2),
('Senior Software Engineer', 120000, 2),
('Accountant', 65000, 3),
('Sales Representative', 60000, 4),
('Marketing Specialist', 55000, 5);

-- Seed data for employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alice', 'Johnson', 1, NULL),
('Bob', 'Smith', 2, NULL),
('Charlie', 'Brown', 3, 2),
('Diane', 'Green', 4, NULL),
('Eve', 'White', 5, NULL),
('Frank', 'Black', 6, NULL);