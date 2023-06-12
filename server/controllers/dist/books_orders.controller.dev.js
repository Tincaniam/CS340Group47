"use strict";

/*
Project server code (primarily the codebase organizaiton) adapted from:
    "Create CRUD APIs in NodeJS, Express and MySQL"
    Date: 2023-04-05
    https://medium.com/@rahulguptalive/create-crud-apis-in-nodejs-express-and-mysql-abda4dfc2d6
*/
var Book_Order = require("../models/books_orders.model.js");

getAll = function getAll(req, res) {
  Book_Order.getAll(function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Error occurred while retrieving books_orders."
      });
    } else {
      res.send(data);
    }

    ;
  });
};

create = function create(req, res) {
  console.log("req.body: ");
  console.log(req.body);
  var newBook_Order = new Book_Order({
    book_id: req.body.book_id,
    order_id: req.body.order_id
  });
  console.log("newBook_Order: ");
  console.log(newBook_Order);
  Book_Order.create(newBook_Order, function (err, data) {
    if (err) {
      res.status(500).send({
        message: err.message || "Error: 500 Internal Server Error."
      });
    } else {
      res.send(data);
    }

    ;
  });
};

module.exports = {
  getAll: getAll,
  create: create
};