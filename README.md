# Employee Tracker CLI

## Description

The **Employee Tracker CLI** is a command-line application for managing a company's employee database. It provides features to view, add, and update departments, roles, and employees, helping businesses organize and plan efficiently. The app uses **Node.js**, **Inquirer**, and **PostgreSQL** for a smooth database interaction.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Technologies Used](#technologies-used)
5. [Database Schema](#database-schema)
6. [Walkthrough Video](#walkthrough-video)
7. [License](#license)

---

## Features

- **View Options**:
  - View all departments.
  - View all roles, including department, title, and salary information.
  - View all employees with detailed information, including roles, departments, salaries, and managers.
- **Add Options**:
  - Add a new department.
  - Add a new role and associate it with a department.
  - Add a new employee and assign them a role and manager.
- **Update Options**:
  - Update an employee's role.
- **Dynamic Queries**:
  - Dynamically fetch data from the database for seamless functionality.

---

## Installation

1. Clone the repository:

git clone https://github.com/your-username/employee-tracker.git
cd employee-tracker

2. Install dependencies:

npm install

3. Set up the `.env` file:
Create a `.env` file in the root directory and add the following:

DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

4. Set up the database:
- Create the schema:
  ```
  psql -U postgres -d your_database_name -f db/schema.sql
  ```
- Seed the database:
  ```
  psql -U postgres -d your_database_name -f db/seeds.sql
  ```

5. Build the application:

npm run build

6. Start the application:

npm start

---

## Usage

1. Run the application:

npm start

2. Select an action from the menu:
- View, add, or update departments, roles, and employees.
3. Follow the prompts to complete the selected action.
4. The application will dynamically interact with the database, reflecting updates in real time.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building application logic.
- **Inquirer.js**: Provides a user-friendly interface for command-line prompts.
- **PostgreSQL**: Relational database for storing company data.
- **pg**: PostgreSQL client for Node.js.
- **dotenv**: Manages environment variables securely.
- **TypeScript**: Ensures type safety in development.

---

## Database Schema

### Department Table

| Column | Type         | Description            |
|--------|--------------|------------------------|
| id     | SERIAL       | Primary key            |
| name   | VARCHAR(30)  | Name of the department |

### Role Table

| Column        | Type         | Description                     |
|---------------|--------------|---------------------------------|
| id            | SERIAL       | Primary key                    |
| title         | VARCHAR(30)  | Title of the role              |
| salary        | DECIMAL      | Salary for the role            |
| department_id | INTEGER      | Foreign key referencing `id` in `department` |

### Employee Table

| Column      | Type         | Description                     |
|-------------|--------------|---------------------------------|
| id          | SERIAL       | Primary key                    |
| first_name  | VARCHAR(30)  | Employee's first name          |
| last_name   | VARCHAR(30)  | Employee's last name           |
| role_id     | INTEGER      | Foreign key referencing `id` in `role` |
| manager_id  | INTEGER      | Foreign key referencing `id` in `employee` |

---

## Walkthrough Video

[Click here to view the walkthrough video](https://youtu.be/7-s8f4dYjMA)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Future Enhancements

Consider adding:
- Delete functionality for departments, roles, and employees.
- Budget calculation for each department.
- View employees by manager or department.