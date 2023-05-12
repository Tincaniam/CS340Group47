"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = require('../db-connector');

var Customer =
/*#__PURE__*/
function () {
  function Customer(customer) {
    _classCallCheck(this, Customer);

    this.first_name = customer.first_name;
    this.last_name = customer.last_name;
    this.address = customer.address;
    this.email_address = customer.email_address;
    this.phone_number = customer.phone_number;
  }

  _createClass(Customer, null, [{
    key: "create",
    value: function create(newCustomer, result) {
      db.query("INSERT INTO Customers (first_name, last_name, address, email_address, phone_number)\n        VALUES ('".concat(newCustomer.first_name, "', '").concat(newCustomer.last_name, "', '").concat(newCustomer.address, "', '").concat(newCustomer.email_address, "', '").concat(newCustomer.phone_number, "');"), function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null); // err is the error object, null is the result

          return;
        } else {
          console.log("created customer: ", _objectSpread({
            id: res.insertId
          }, newCustomer));
          result(null, _objectSpread({
            id: res.insertId
          }, newCustomer));
        }

        ;
      });
    }
  }, {
    key: "getById",
    value: function getById(customerID, result) {
      db.query("SELECT * FROM Customers WHERE customer_id = ".concat(customerID), function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else if (res.length) {
          console.log("found customer: ", res[0]);
          result(null, res[0]);
          return;
        } else {
          // customer with the customer_id not found
          result({
            kind: "not_found"
          }, null);
        }

        ;
      });
    }
  }, {
    key: "getAll",
    value: function getAll(result) {
      db.query("SELECT * FROM Customers", function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else {
          console.log("Customers: ", res);
          result(null, res);
        }

        ;
      });
    }
  }, {
    key: "updateByID",
    value: function updateByID(customerID, customer, result) {
      //db.query(`UPDATE Customers SET first_name = , last_name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip_code = ? WHERE customer_id = ?`,
      db.query("UPDATE Customers SET first_name = '".concat(customer.first_name, "', last_name = '").concat(customer.last_name, "', address = '").concat(customer.address, "', email_address = '").concat(customer.email_address, "', phone_number = '").concat(customer.phone_number, "', WHERE customer_id = ").concat(id), function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else if (res.affectedRows == 0) {
          // customer
          result({
            kind: "not_found"
          }, null);
          return;
        } else {
          console.log("updated customer: ", _objectSpread({
            id: id
          }, customer));
          result(null, _objectSpread({
            id: id
          }, customer));
        }
      });
    }
  }, {
    key: "deleteByID",
    value: function deleteByID(customerID, result) {
      db.query("DELETE FROM Customers WHERE customer_id = ".concat(customerID), function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else if (res.affectedRows == 0) {
          // customer with the customer_id not found
          result({
            kind: "not_found"
          }, null);
          return;
        } else {
          console.log("deleted customer with customer_id: ", customerID);
          result(null, res);
        }

        ;
      });
    }
  }]);

  return Customer;
}();

module.exports = Customer;