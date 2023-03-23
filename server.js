const mysql = require('mysql2');
const inquirer = require ('inquirer');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'J3N.ucnGbXJoKcpr8m',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db successfully!')
);

employeeArray = [];

function init () {

    function generateTeam (){
        inquirer.prompt (
            [
                {
                    type: 'list',
                    name: 'Options',
                    message: 'What would you like to do?',
                    choices: ['View All Employee', 'Add Employee', 'Update Employee Role','Add Role', 'View All Department', 'Add Department']
                }
            ]
        ). then(function (userInput) {
            console.log (
                'You Entered:' + userInput.options
            );

            switch (userInput.Options) {
                case 'View All Employee':
                    viewAllEmployee();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Department':
                    viewAllDepartment();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                
                default:
                    quit();
            }
        });
    }

    function viewAllEmployee() {

        let query = "SELECT * FROM employee";
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            quit();
        });
    }

    function addEmployee

}



