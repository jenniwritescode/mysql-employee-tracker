// dependencies
const mysql = require("mysql");
const fs = require("fs");
const consoleTable = require("console.table");
const inquirer = require("inquirer");

// create mysql connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3001,
  user: "root",
  password: "ITrOCRUArtuR",
  database: "employee_DB",
  socketPath: "/tmp/mysql.sock",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as ID " + connection.threadId);
  startPrompt();
});

// inquirer prompts
function startPrompt() {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Welcome to the Employee Tracker Database! Make a Selection:',
        name: 'checkboxChoices',
        choices: [
          'View all Employees',
          'View all Employees By Role',
          'View all Employees By Department',
          'Update Employee',
          'Add an Employee',
          'Add a Role',
          'Add a Department',
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case 'View all Employees':
          // viewEmployees();
          break;

        case 'View all Employees By Role':
          // viewEmpByRole();
          break;
        case 'View all Employees By Department':
          // viewEmpByDept();
          break;

        case 'Update Employee':
          // addEmployee();
          break;

        case 'Add an Employee':
          // updateEmployee();
          break;

        case 'Add a Role':
          // addRole();
          break;

        case 'Add a Department':
          // addDept();
          break;
      }
    });
}
