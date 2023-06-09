/*
Citations:
    Initial adaption from "Exploration — Implementing a Full-Stack MERN App - Part 1" from CS 290 at Oregon State University.
    Date: 2023-04-05
    https://canvas.oregonstate.edu/courses/1869985/pages/exploration-implementing-a-full-stack-mern-app-part-1?module_item_id=22110234
*/

import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';


export const EditAuthorsPage = ({authorToEdit}) => {

    // State variables
    const [first_name, setFirstName] = useState(authorToEdit.first_name);
    const [last_name, setLastName] = useState(authorToEdit.last_name);
    const [emptyFields, setEmptyFields] = useState([]);

    let history = useHistory();

    // Back to authors page
    const backToAuthors = () => {
        history.push('/authors');
    }

    // Edit author
    const editAuthor = async () => {
        const editedAuthor = { first_name, last_name };
        const response = await fetch(`/api/authors/${authorToEdit.author_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedAuthor)
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            alert("Author edited!")
            history.push('/authors');
        }
    };

    return (
        <div>
            <h3>Authors</h3>
            <br />
            <h5>Edit Author</h5>
            <input
                className={emptyFields.includes("name") ? "error" : "authorField"}
                type="text"
                value = {first_name}
                onChange={e => setFirstName(e.target.value)}
                />
            <input
                className={emptyFields.includes("name") ? "error" : "authorField"}
                type="text"
                value = {last_name}
                onChange={e => setLastName(e.target.value)}
                />
            <div>
                <button className="button-medium" onClick={backToAuthors}>Cancel</button>
                <button className="button-medium" onClick={editAuthor}>Edit Book</button>
            </div>
        </div>
    );
}

export default EditAuthorsPage;