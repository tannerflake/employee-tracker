import { config } from "dotenv"; // Load environment variables
import inquirer from "inquirer";
import { pool } from "./db.js"; // Import pool from db.js

config(); // Load environment variables

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    console.log('Database connection successful!');
    console.log('Server time:', result.rows[0].current_time);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if the connection fails
  }
}

testDatabaseConnection();

async function mainMenu() {
  const choices = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Exit",
  ];

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices,
    },
  ]);

  return action;
}

async function viewAllDepartments() {
  try{
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
  } catch (err) {
    const error = err as Error;
    console.error('Error fetching departments:', error.message);
  }
}

async function viewAllRoles() {
  try{
    const result = await pool.query('SELECT * FROM role');
    console.table(result.rows);
  } catch (err) {
    const error = err as Error;
    console.error('Error fetching roles:', error.message);
  }
} 

async function viewAllEmployees() {
  try {
    const result = await pool.query(`
      SELECT 
        e.id AS employee_id,
        e.first_name,
        e.last_name,
        r.title AS role,
        d.name AS department,
        r.salary,
        COALESCE(
          CONCAT(m.first_name, ' ', m.last_name), 
          'No manager'
        ) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);

    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err.message);
  }
}

async function addDepartment() {
  try {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
        validate: (input) => input.trim() !== "" || 'Department name cannot be empty'
      },
    ]);

  // Insert the new department into the database
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING id', [name]);
    console.log(`Department "${name}" added successfully with ID: ${result.rows[0].id}`);
  } catch (err) {
    const error = err as Error;
    console.error('Error adding department:', error.message);
  }
}

async function addRole() {
  try {
    // Fetch departments for dynamic selection
    const departments = await pool.query('SELECT id, name FROM department');
    const departmentChoices = departments.rows.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));

    // Prompt user for role details
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
        validate: (input) => input.trim() !== '' || 'Role title cannot be empty',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:',
        validate: (input) => (!isNaN(parseFloat(input)) && parseFloat(input) > 0) || 'Enter a valid positive number for salary',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for this role:',
        choices: departmentChoices,
      },
    ]);

    // Insert the new role into the database
    const result = await pool.query(
      'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id',
      [title, parseFloat(salary), departmentId]
    );

    console.log(`Role "${title}" added successfully with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error adding role:', err.message);
  }
}

async function addEmployee() {
  try {
    // Fetch roles for dynamic selection
    const roles = await pool.query('SELECT id, title FROM role');
    const roleChoices = roles.rows.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    // Fetch employees for selecting a manager
    const employees = await pool.query(`
      SELECT 
        id, 
        COALESCE(CONCAT(first_name, ' ', last_name), 'No manager') AS name 
      FROM employee
    `);

    const employeeChoices = employees.rows.map((emp) => ({
      name: emp.name,
      value: emp.id,
    }));

    // Add a "None" option for employees without a manager
    employeeChoices.unshift({ name: 'None', value: null });

    // Prompt user for employee details
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
        validate: (input) => input.trim() !== '' || 'First name cannot be empty',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
        validate: (input) => input.trim() !== '' || 'Last name cannot be empty',
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for this employee:',
        choices: roleChoices,
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for this employee:',
        choices: employeeChoices,
      },
    ]);

    // Insert the new employee into the database
    const result = await pool.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [firstName, lastName, roleId, managerId]
    );

    console.log(`Employee "${firstName} ${lastName}" added successfully with ID: ${result.rows[0].id}`);
  } catch (err) {
    console.error('Error adding employee:', err.message);
  }
}

async function updateEmployeeRole() {
  try {
    // Fetch employees for dynamic selection
    const employees = await pool.query('SELECT id, first_name, last_name FROM employee');
    const employeeChoices = employees.rows.map((emp) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id,
    }));

    // Fetch roles for dynamic selection
    const roles = await pool.query('SELECT id, title FROM role');
    const roleChoices = roles.rows.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    // Prompt user for employee and new role
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee whose role you want to update:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roleChoices,
      },
    ]);

    // Update the employee's role in the database
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    console.log('Employee role updated successfully.');
  } catch (err) {
    console.error('Error updating employee role:', err.message);
  }
}


async function run() {
  let exit = false;

  while (!exit) {
    const action = await mainMenu();
    switch (action) {
      case "View all departments":
        console.log("Viewing all departments...");
        await viewAllDepartments();
        break;
      case "View all roles":
        console.log("Viewing all roles...");
        await viewAllRoles();
        break;
      case "View all employees":
        console.log("Viewing all employees...");
        await viewAllEmployees();
        break;
      case "Add a department":
        console.log("Adding a department...");
        await addDepartment();
        break;
      case "Add a role":
        console.log("Adding a role...");
        await addRole();
        break;
      case "Add an employee":
        console.log("Adding an employee...");
        await addEmployee();
        break;
      case "Update an employee role":
        console.log("Updating an employee role...");
        await updateEmployeeRole();
        break;
      case "Exit":
        exit = true;
        console.log("Goodbye!");
        break;
    }
  }

  await pool.end();
}

run().catch((err) => console.error("Error starting application:", err));
