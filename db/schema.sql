--CREATE DATABASE --
DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

-- USE DATABASE --
USE employee_DB;

-- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30)
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
INSERT INTO department (dept_name)
VALUE ("Customer Service");
INSERT INTO department (dept_name)
VALUE ("Sales");
INSERT INTO department (dept_name)
VALUE ("Finance");
INSERT INTO department (dept_name)
VALUE ("Accounting");
INSERT INTO department (dept_name)
VALUE ("Legal");
INSERT INTO department (dept_name)
VALUE ("Executive Management");

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
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 185000, 5);
INSERT INTO role (title, salary, department_id)
VALUE ("Chief Executive Officer", 300000, 6);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jessica", "Jones", null, 9);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Reva", "Connors", 1, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Trish", "Walker", 2, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jeri","Hogarth", 1, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Luke", "Cage", 4, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Griffin", "Sinclair", 1, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Malcolm", "Ducasse", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Audrey", "Eastman", 7, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Hope", "Shlottman", 1, 8);

-- SELECT COMMANDS FOR SQL WORKBENCH --
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;