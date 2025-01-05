import * as dotenv from 'dotenv'; // Import dotenv for environment variables
import inquirer from 'inquirer'; // For command-line interaction
import { pool } from './db'; // Correct named import for pool
dotenv.config(); // Load environment variables
// Main menu function
async function mainMenu() {
    const choices = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
    ];
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices,
        },
    ]);
    return action;
}
// Function to view all departments
async function viewAllDepartments() {
    console.log('Viewing all departments...');
    const result = await pool.query('SELECT * FROM department');
    console.table(result.rows);
}
// Function to view all roles
async function viewAllRoles() {
    console.log('Viewing all roles...');
    const result = await pool.query('SELECT * FROM role');
    console.table(result.rows);
}
// Function to view all employees
async function viewAllEmployees() {
    console.log('Viewing all employees...');
    const result = await pool.query('SELECT * FROM employee');
    console.table(result.rows);
}
// Main application loop
async function run() {
    let exit = false;
    while (!exit) {
        const action = await mainMenu();
        switch (action) {
            case 'View all departments':
                await viewAllDepartments();
                break;
            case 'View all roles':
                await viewAllRoles();
                break;
            case 'View all employees':
                await viewAllEmployees();
                break;
            case 'Add a department':
                console.log('Add a department...');
                break;
            case 'Add a role':
                console.log('Add a role...');
                break;
            case 'Add an employee':
                console.log('Add an employee...');
                break;
            case 'Update an employee role':
                console.log('Update an employee role...');
                break;
            case 'Exit':
                exit = true;
                console.log('Goodbye!');
                break;
        }
    }
    // Clean up the database connection
    await pool.end();
}
// Run the application and handle errors
run().catch((err) => console.error('Error starting application:', err));
