/*
Citations:
    Project server code (primarily the codebase organizaiton) adapted from:
    "Create CRUD APIs in NodeJS, Express and MySQL"
    Date: 2023-04-05
    https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
*/

// Import the database connection
const db = require('../db-connector');

// Define the Author class
class Author {
    constructor(author) {
        this.first_name = author.first_name;
        this.last_name = author.last_name;
    }
    
    // Create a new author
    static create(newAuthor, result) {
        db.query(`INSERT INTO Authors (first_name, last_name)
        VALUES ('${newAuthor.first_name}', '${newAuthor.last_name}');`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null); // err is the error object, null is the result
                return;
            }
            else {
                console.log("created author: ", { res });
                result(null, { res });
            };

        });
    }

    // Retrieve a single author with authorID
    static getByID(authorID, result) {
        db.query(`SELECT * FROM Authors WHERE author_id = ${authorID}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.length) {
                console.log("found author: ", res[0]);
                result(null, res[0]);
                return;
            }
            else {
                // author with the author_id not found
                result({ kind: "not_found" }, null);
            };
        });
    }

    // Retrieve all authors
    static getAll(result) {
        db.query("SELECT * FROM Authors", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                console.log("Authors: ", res);
                result(null, res);
            };
        });
    }

    // Update a author with authorID
    static updateByID(authorID, author, result) {
        //db.query("UPDATE Authors SET first_name = ?, last_name = ? WHERE author_id = ?", [author.first_name, author.last_name, id], (err, res) => {
        db.query(`UPDATE Authors SET first_name = '${author.first_name}', last_name = '${author.last_name}' WHERE author_id = ${authorID};`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.affectedRows == 0) {
                // author with the id not found
                result({ kind: "not_found" }, null);
                return;
            }
            else {
                console.log("updated author: ", res);
                result(null, { res });
            };
        });
    }

    // Delete a author with authorID
    static deleteByID(authorID, result) {
        db.query(`DELETE FROM Authors WHERE author_id = ${authorID}`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else if (res.affectedRows == 0) {
                // book with the id not found
                result({ kind: "not_found" }, null);
                return;
            }
            else {
                console.log("deleted Author with author_id: ", authorID);
                result(null, res);
            };
        });
    }
}

// Export the Author class
module.exports = Author;
