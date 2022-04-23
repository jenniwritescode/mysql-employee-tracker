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
  socketPath: '/tmp/mysql.sock'
});

connection.connect(function(err) {
  if (err) throw err
  console.log("Connected as ID " + connection.threadId)
  // startPrompt();
});


