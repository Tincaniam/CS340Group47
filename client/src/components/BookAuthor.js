/*
Citations:
    Initial adaption from "Exploration — Implementing a Full-Stack MERN App - Part 1" from CS 290 at Oregon State University.
    Date: 2023-04-05
    https://canvas.oregonstate.edu/courses/1869985/pages/exploration-implementing-a-full-stack-mern-app-part-1?module_item_id=22110234
*/

import React from 'react';

// Define a BookAuthor component for the BookAuthor table.
function BookAuthor({ book_author, editBookAuthor, deleteBookAuthor }) {
    return (

        <tr>
            <td>{book_author.book_id}</td>
            <td>{book_author.book_title}</td>
            <td>{book_author.author_id}</td>
            <td>{book_author.author_name}</td>
            <td>
                <button className="btn btn-outline-primary" onClick={() => editBookAuthor(book_author)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) deleteBookAuthor(book_author.book_id, book_author.author_id)}}>Delete</button>
            </td>
        </tr>
    );
}

export default BookAuthor;
