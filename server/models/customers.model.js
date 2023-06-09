/*
Citations:
    Project server code (primarily the codebase organizaiton) adapted from:
    "Create CRUD APIs in NodeJS, Express and MySQL"
    Date: 2023-04-05
    https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
*/

// Import the database connection
const db = require('../db-connector');

// Define the Customer class
class Customer {
    constructor(customer) {
        this.first_name = customer.first_name;
        this.last_name = customer.last_name;
        this.address = customer.address;
        this.email_address = customer.email_address;
        this.phone_number = customer.phone_number;
    }

    // Create a new customer
    static create(newCustomer, result) {
        db.query(`INSERT INTO Customers (first_name, last_name, address, email_address, phone_number)
        VALUES ('${newCustomer.first_name}', '${newCustomer.last_name}', '${newCustomer.address}', '${newCustomer.email_address}', '${newCustomer.phone_number}');`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null); // err is the error object, null is the result
                return;
            }
            else {
                console.log("created customer: ", { res });
                result(null, { res });
            };

        });
    }

    // Retrieve a single customer with customerID
    static getById(customerID, result) {
        db.query(`SELECT * FROM Customers WHERE customer_id = ${customerID}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.length) {
                console.log("found customer: ", res[0]);
                result(null, res[0]);
                return;
            }
            else {
                // customer with the customer_id not found
                result({ kind: "not_found" }, null);
            };
        });
    }

    // Retrieve all customers
    static getAll(result) {
        db.query("SELECT * FROM Customers", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                console.log("Customers: ", res);
                result(null, res);
            };
        });
    }

    // Update a customer with customerID
    static updateByID(customerID, customer, result) {
        //db.query(`UPDATE Customers SET first_name = , last_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip_code = ? WHERE customer_id = ?`,
        db.query(`UPDATE Customers SET first_name = '${customer.first_name}', last_name = '${customer.last_name}', address = '${customer.address}', email_address = '${customer.email_address}', phone_number = '${customer.phone_number}' WHERE customer_id = ${customerID}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.affectedRows == 0) {
                // customer
                result({ kind: "not_found" }, null);
                return;
            }
            else {
                console.log("updated customer: ", { res });
                result(null, { res });
            }
        });
    }

    // Delete a customer with customerID
    static deleteByID(customerID, result) {
        db.query(`DELETE FROM Customers WHERE customer_id = ${customerID}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.affectedRows == 0) {
                // customer with the customer_id not found
                result({ kind: "not_found" }, null);
                return;
            }
            else {
                console.log("deleted customer with customer_id: ", customerID);
                result(null, res);
            };
        });
    }
}

module.exports = Customer;

    