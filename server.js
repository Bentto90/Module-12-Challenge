const mysql = require('mysql2');
const inquirer = require ('inquirer');
const table = require('console.table');

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

db.connect(function (err) {
    if (err) throw err;
    console.log('EMPLOYEE TRACKER')
    employeeTracker();
})

    function employeeTracker (){
        inquirer.prompt (
            [
                {
                    type: 'list',
                    name: 'Options',
                    message: 'What would you like to do?',
                    choices: ['View All Employee', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'Quit']
                }
            ]
        ). then(function (userInput) {
            console.log (
                userInput.options
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
                case 'View All Roles':
                    viewRole();
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
                case 'Quit':
                    connection.end();
                    break;
                
                default:
                    employeeTracker();
            }
        });
    }

    function viewAllEmployee() {

        let query = 'SELECT * FROM employee';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            employeeTracker();
        });
    }

    function viewAllDepartment() {

        let query = 'SELECT * FROM department';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            employeeTracker();
        });
    }


    function viewRole () {

        let query = 'SELECT * FROM role';
        db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            employeeTracker();
        });
    }

    function addEmployee() {
        inquirer.prompt ([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: "What is employee's first name?"
            },

            {
                type: 'input',
                name: 'employeeLastName',
                message: "What is employee's last name?"
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: "What is employee's role? (1 =",
            },
            {
                type: 'input',
                name: 'employeeManager',
                message: "Who is employee's manager?",
            }
        ])
        .then (function(response) {
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager], function(err,res) {
                if (err) throw err;
                console.table(res);
                employeeTracker()
            });
        });
    };

    function addDepartment() {
        inquirer.prompt ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department?'   
            }
        ])
        .then (function(response) {
            db.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], function(err, res) {
                if (err) throw err;
                console.table(res)
                employeeTracker()
            });
        });
    };

    function addRole() {
        inquirer.prompt ([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },

            {
                type: 'number',
                name: 'roleSalary',
                message: 'What is the role salary?'
            },
            
            {
                type: 'input',
                name: 'depID',
                message: 'What departement is the role from?'
            }

        ])
        .then (function(response) {
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.roleName, response.roleSalary, response.depID], function(err, res) {
                if (err) throw (err);
                console.table(res);
                employeeTracker();
            });
        })
    }

    function updateEmployee() {
        inquirer.prompt ([
            {
                type: 'input',
                name: 'employeeUpdate',
                message: "Which employee's role do you want to update?"
            },

            {
                type: 'input',
                name: 'employeeAssign',
                message: "Which role do you want to assign the selected employee?"
            }
        ])
        .then (function(response) {
            db.query('UPDATE employee SET ? WHERE ?',
            [
                { 
                    role_id: response.employeeAssign,
                },
                {
                    first_name: response.employeeUpdate
                } 
            ],  
            function (err, res) {
                if (err) throw(err);
                console.table(res);
                employeeTracker();
            });
        });
    }

