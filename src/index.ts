import { config } from "dotenv"; // Load environment variables
import inquirer from "inquirer";
import { pool } from "./db.js"; // Import pool from db.js

config(); // Load environment variables

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

async function run() {
  let exit = false;

  while (!exit) {
    const action = await mainMenu();
    switch (action) {
      case "View all departments":
        console.log("Viewing all departments...");
        break;
      case "View all roles":
        console.log("Viewing all roles...");
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
