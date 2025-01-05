import inquirer from 'inquirer'; // For command-line interaction
import pool from './Main/db'; // For database connection
import dotenv from 'dotenv'; // For environment variables

dotenv.config(); // Load environment variables

async function mainMenu() {
    const choices = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
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