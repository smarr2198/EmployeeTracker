//dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTab = require("console.table");
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

db.connect(function (err) {
  if (err) throw err;
  startPrompt();
});

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
