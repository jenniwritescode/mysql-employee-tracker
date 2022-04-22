--CREATE DATABASE --
DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

-- USE DATABASE --
USE employee_DB;

-- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
-- ROLE TABLE ----
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- EMPLOYEE TABLE ----
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Customer Service");
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Accounting");

-- ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Support Lead", 75000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Call Center Rep", 40000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Account Manager", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Stock Analyst", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Accountant", 120000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant I", 85000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jessica", "Jones", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Trish", "Walker", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jeri","Hogarth", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Luke", "Cage", 3, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Griffin", "Sinclair", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Malcolm", "Ducasse", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Audrey", "Eastman", 6, 7);

-- SELECT COMMANDS FOR SQL WORKBENCH --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;