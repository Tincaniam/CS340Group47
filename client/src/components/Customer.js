/*
Citations:
    Initial adaption from "Exploration — Implementing a Full-Stack MERN App - Part 1" from CS 290 at Oregon State University.
    Date: 2023-04-05
    https://canvas.oregonstate.edu/courses/1869985/pages/exploration-implementing-a-full-stack-mern-app-part-1?module_item_id=22110234
*/

import React from 'react';

// Define a Customer component for the Customer table.
function Customer({ customer, editCustomer, deleteCustomer }) {
    return (

        <tr>
            <td>{customer.customer_id}</td>
            <td>{customer.first_name}</td>
            <td>{customer.last_name}</td>
            <td>{customer.address}</td>
            <td>{customer.email_address}</td>
            <td>{customer.phone_number}</td>
            <td>
                <button className="btn btn-outline-primary" onClick={() => {editCustomer(customer)}}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteCustomer(customer.customer_id)}}>Delete</button>
            </td>
        </tr>
    );
}

export default Customer;