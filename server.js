const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTab = require("console.table");
const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker_db database.`)
);
//when database starts, run the startPrompt function
db.connect(function (err) {
  if (err) throw err;
  startPrompt();
});
//first function that would ask user what action they would like to do
const startPrompt = async () => {
  try {
    let response = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "Click An Action",
      choices: [
        "View Employees",
        "Add Employees",
        "View Departments",
        "Add Departments",
        "View Positions/Roles",
        "Add Positions/Roles",
        "Exit",
      ],
    });

    switch (response.action) {
      case "View Employees":
        viewEmployees();
        break;

      case "Add Employees":
        addEmployees();
        break;

      case "View Departments":
        viewDepartments();
        break;

      case "Add Departments":
        addDepartments();
        break;

      case "View Positions/Roles":
        viewRoles();
        break;

      case "Add Positions/Roles":
        addRoles();
        break;

      case "Exit":
        db.end();
        break;
    }
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// view employee table in console
const viewEmployees = async () => {
  try {
    let query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
      let employeeArray = [];
      res.forEach((employee) => employeeArray.push(employee));
      console.table(employeeArray);
      startPrompt();
    });
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// add employee in console
const addEmployees = async () => {
  try {
    let response = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "enter employees first name",
      },
      {
        name: "last_name",
        type: "input",
        message: "enter employees last name?",
      },
      {
        name: "role_id",
        type: "input",
        message:
          "enter employees role ID. (this should match the id number of the specific job/role) Ex. 1 for Manager, 2 for Sales, 3 for Intern",
      },
      {
        name: "manager_id",
        type: "input",
        message:
          "enter the manager ID of this employee. (this should match the id number of the employees manager) Ex. if stephen is the manager and his ID is 1, that will be your input.",
      },
    ]);

    let answer = await db.query("INSERT INTO employee SET ?", {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: response.role_id,
      manager_id: response.manager_id,
    });
    console.log(`${response.first_name} ${response.last_name} has been added.`);
    startPrompt();
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// view department table in console
const viewDepartments = async () => {
  try {
    let query = "SELECT * FROM department";
    db.query(query, function (err, res) {
      let departmentArray = [];
      res.forEach((department) => departmentArray.push(department));
      console.table(departmentArray);
      startPrompt();
    });
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// add department in console
const addDepartments = async () => {
  try {
    let response = await inquirer.prompt([
      {
        name: "department_name",
        type: "input",
        message: "enter the name of the department",
      },
    ]);

    let answer = await db.query("INSERT INTO department SET ?", {
      department_name: response.department_name,
    });
    console.log(`${response.department_name} has been added.`);
    startPrompt();
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// view Role/Position table in console
const viewRoles = async () => {
  try {
    let query = "SELECT * FROM position_roll";
    db.query(query, function (err, res) {
      let roleArray = [];
      res.forEach((role) => roleArray.push(role));
      console.table(roleArray);
      startPrompt();
    });
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
// add position/role in console
const addRoles = async () => {
  try {
    let response = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "enter role/job title",
      },
      {
        name: "salary",
        type: "input",
        message: "enter salary for that role (can use decimal)",
      },
      {
        name: "department_id",
        type: "input",
        message: "give role/job title a unique ID to be affiliated by",
      },
    ]);

    let answer = await db.query("INSERT INTO position_roll SET ?", {
      title: response.title,
      salary: response.salary,
      department_id: response.department_id,
    });
    console.log(`${response.first_name} ${response.last_name} has been added.`);
    startPrompt();
  } catch (err) {
    console.log(err);
    startPrompt();
  }
};
