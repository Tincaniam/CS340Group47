/*
Citations:
    Project server code (primarily the codebase organizaiton) adapted from:
    "Create CRUD APIs in NodeJS, Express and MySQL"
    Date: 2023-04-05
    https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
*/

const Order = require("../models/orders.model.js");

getAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Error occurred while retrieving orders."});
        }
        else {
            res.send(data);
        };
    });
}

getByID = (req, res) => {
    Order.getByID(req.params.orderID, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Order with id " + req.params.orderID + " not found."});
            }
            else {
                res.status(500).send({message: "Error retrieving order with id " + req.params.orderID});
            };
        }
        else {
            res.send(data);
        };
    });
}

create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({message: "No content in request body."});
    };

    const newOrder = new Order({
        customer_id: req.body.customer_id,
        order_date: req.body.order_date,
        order_total: req.body.order_total,
        discount_code_id: req.body.discount_code_id
        })
        console.log("newOrder: ");
        console.log(newOrder);

    Order.create(newOrder, (err, data) => {
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

    Order.updateByID(req.params.orderID, new Order(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Order with id " + req.params.orderID + " not found."});
            }
            else {
                res.status(500).send({message: "Error updating order with id " + req.params.orderID});
            };
        }
        else {
            res.send(data);
        };
    });
}

deleteByID = (req, res) => {
    Order.deleteByID(req.params.orderID, (err, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({message: "Order with id " + req.params.orderID + " not found."});
            }
            else {
                res.status(500).send({message: "Error deleting order with id " + req.params.orderID});
            };
        }
        else {
            res.send({message: "Order deleted successfully."});
        };
    });
}

module.exports = { getAll, getByID, create, updateByID, deleteByID };