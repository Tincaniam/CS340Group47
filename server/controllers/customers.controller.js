const Customer = require("../models/customers.model.js");

getAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Error occurred while retrieving customers."});
        }
        else {
            res.send(data);
        };
    });
}

getByID = (req, res) => {
    Customer.getByID(req.params.customerID, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Customer with id " + req.params.customerID + " not found."});
            }
            else {
                res.status(500).send({message: "Error retrieving customer with id " + req.params.customerID});
            };
        }
        else {
            res.send(data);
        };
    });
}

create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "No content in request body."});
    };

    const newCustomer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number
        })
        console.log("newCustomer: ");
        console.log(newCustomer);

    Customer.create(newCustomer, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Error: 500 Internal Server Error."});
        }
        else {
            res.send(data);
        };
    });
}

updateByID = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "Error: 400 Bad Request."});
    };

    Customer.updateBYID(req.params.customerID, new Customer(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Customer with id " + req.params.customerID + " not found."});
            }
            else {
                res.status(500).send({message: "Error updating customer with id " + req.params.customerID});
            };
        }
        else {
            res.send(data);
        };
    });
}

deleteByID = (req, res) => {
    Customer.deleteByID(req.params.customerID, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Customer with id " + req.params.customerID + " not found."});
            }
            else {
                res.status(500).send({message: "Error deleting customer with id " + req.params.customerID});
            };
        }
        else {
            res.send({message: "Customer was deleted successfully."});
        };
    });
}

module.exports = { getAll, getByID, create, updateByID, deleteByID };