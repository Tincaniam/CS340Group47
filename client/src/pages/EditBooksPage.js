/*
Citations:
    Initial adaption from "Exploration — Implementing a Full-Stack MERN App - Part 1" from CS 290 at Oregon State University.
    Date: 2023-04-05
    https://canvas.oregonstate.edu/courses/1869985/pages/exploration-implementing-a-full-stack-mern-app-part-1?module_item_id=22110234
*/

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

export const EditBooksPage = ({bookToEdit}) => {

    // State variables
    const [title, setTitle] = useState(bookToEdit.title);
    const [publication_date, setPublicationDate] = useState(bookToEdit.publication_date);
    const [emptyFields, setEmptyFields] = useState([]);

    let history = useHistory();

    // Back to books
    const backToBooks = () => {
        history.push('/books');
    }

    // Edit book
    const editBook = async () => {
        const editedBook = { title, publication_date };
        const response = await fetch(`/api/books/${bookToEdit.book_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedBook)
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            alert("Book edited!")
            history.push('/books');
        }
    };

    return (
        <div>
            <h3>Books</h3>
            <br />
            <h5>Edit Book</h5>
            <input
                className={emptyFields.includes("title") ? "error" : "bookField"}
                type="text"
                value = {title}
                onChange={e => setTitle(e.target.value)}
                />
            <input
                className={emptyFields.includes("publication_date") ? "error" : "bookField"}
                type="text"
                value = {publication_date}
                onChange={e => setPublicationDate(e.target.value)}
                />
            <div>
                <button className="button-medium" onClick={backToBooks}>Cancel</button>
                <button className="button-medium" onClick={editBook}>Edit Book</button>
            </div>
        </div>
    );
}

export default EditBooksPage;