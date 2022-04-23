// dependencies
const mysql = require("mysql");
const fs = require("fs");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const LogColors = require("./logColors");

const log = new LogColors();

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
        type: "list",
        name: "listChoice",
        message: "Welcome to the Employee Tracker Database! Make a Selection:",
        choices: [
          "View all Employees",
          "View all Employees By Role",
          "View all Employees By Department",
          "Add an Employee",
          "Update Employee",
          "Add a Role",
          "Add a Department",
          "EXIT",
        ],
      },
    ])
    .then(function (val) {
      var myChoice = val.listChoice.toString();
      switch (myChoice) {
        case "View all Employees":
          viewEmployees();
          break;
        case "View all Employees By Role":
          viewEmpByRole();
          break;
        case "View all Employees By Department":
          viewEmpByDept();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee":
          // updateEmployee();
          break;
        case "Add a Role":
          // addRole();
          break;

        case "Add a Department":
          // addDept();
          break;

        case "EXIT":
          log.red("\n", "Exiting Application...");
          connection.end();
          log.red("\n", "Database Connection closed. Good-bye!");
          process.exit();
      }
    });
}

// list choice functions below

// view all employees function
function viewEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      log.green("\n", "------ List of All Employees ------", "\n");
      console.table(res);
      startPrompt();
    }
  );
}

// view all employees by role function
function viewEmpByRole() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      log.teal("\n", "------ List of Employees by Role ------", "\n");
      console.table(res);
      startPrompt();
    }
  );
}

// view all employees by dept function
function viewEmpByDept() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.dept_name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      log.yellow("\n", "------ List of Employees by Department ------", "\n");
      console.table(res);
      startPrompt();
    }
  );
}

// add new employee function
async function addEmployee() {
  const addName = await inquirer.prompt([
    {
      name: "first",
      type: "input",
      message: "Enter the first name: ",
    },
    {
      name: "last",
      type: "input",
      message: "Enter the last name: ",
    },
  ]);
  connection.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id;",
    async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
        {
          name: "role",
          type: "list",
          choices: () => res.map((res) => res.title),
          message: "Choose the new employee role: ",
        },
      ]);
      let roleId;
      for (const row of res) {
        if (row.title === role) {
          roleId = row.id;
          continue;
        }
      }
      connection.query("SELECT * FROM employee", async (err, res) => {
        if (err) throw err;
        let choices = res.map((res) => `${res.first_name} ${res.last_name}`);
        choices.push("none");
        let { manager } = await inquirer.prompt([
          {
            name: "manager",
            type: "list",
            choices: choices,
            message: "Choose the new employee manager: ",
          },
        ]);
        let managerId;
        let managerName;
        if (manager === "none") {
          managerId = null;
        } else {
          for (const data of res) {
            data.fullName = `${data.first_name} ${data.last_name}`;
            if (data.fullName === manager) {
              managerId = data.id;
              managerName = data.fullName;
              console.log(managerId);
              console.log(managerName);
              continue;
            }
          }
        }
        log.green(
          "\n" +
            "New employee has been added. Please select View all Employees to verify." +
            "/n"
        );
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: addName.first,
            last_name: addName.last,
            role_id: roleId,
            manager_id: parseInt(managerId),
          },
          (err, res) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
    }
  );
}
