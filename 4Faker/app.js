// npm install express mysql2 faker body-parser


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const faker = require('@faker-js/faker');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'employeeDB',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Generate 100 employees data and insert into MySQL
app.get('/generate', (req, res) => {
    const employees = [];
    for (let i = 0; i < 100; i++) {
        const name = faker.faker.name.fullName();
        const email = faker.faker.internet.email();
        const department = faker.faker.commerce.department();
        const salary = faker.faker.finance.amount(30000, 150000, 2);

        employees.push([name, email, department, salary]);
    }

    const sql = 'INSERT INTO employees (name, email, department, salary) VALUES ?';

    db.query(sql, [employees], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Failed to generate employee data');
            return;
        }
        res.send('100 employees generated and inserted into database');
    });
});

// Display employees in a table format
app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).send('Failed to retrieve employees');
            return;
        }

        let html = `
            <table border="1" style="width: 100%; text-align: left;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
        `;

        results.forEach((employee) => {
            html += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        res.send(html);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



/*


CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(100),
    salary DECIMAL(10, 2)
);

*/
