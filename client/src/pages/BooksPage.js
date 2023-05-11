import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import BooksTable from '../components/BooksTable';

// helper function to normalize date format
const normalizeDate = date => {
    let dateParts = date.split(/[-/\.]/);
    console.log(dateParts);

    if (dateParts.length !== 3) return date;

    // Reverse the date parts to get YYYY-MM-DD format
    if ((dateParts[2].length === 4) || (dateParts[0].length === 1 && dateParts[1].length === 1)) {
        dateParts = [dateParts[2], dateParts[1], dateParts[0]];
    }
    console.log(dateParts);

    if (dateParts[0].length !== 4){
        dateParts[0] = '20' + dateParts[0];
    }
    if (dateParts[1].length === 1){
        dateParts[1] = '0' + dateParts[1];
    }
    if (dateParts[2].length === 1){
        dateParts[2] = '0' + dateParts[2];
    }
    return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
}

function BooksPage ({setBookToEdit}) {
    const [books, setBooks] = React.useState([]);
    const history = useHistory();

    // book states
    const [title, setTitle] = useState('');
    const [publication_date, setPublicationDate] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const addBook = async () => {
        const newBook = {
            title,
            publication_date
        };

        newBook.publication_date = normalizeDate(newBook.publication_date);

        // check for empty fields
        const emptyFields = [];
        if (!newBook.title) emptyFields.push('title');
        if (!newBook.publication_date) emptyFields.push('publication_date');

        if (emptyFields.length) {
            setEmptyFields(emptyFields);
            return;
        }
        
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            const json = await response.json();
            alert(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            alert("Book added!")
            fetchBooks();
        }
    }

    const editBook = book => {
        setBookToEdit(book);
        history.push('/edit-books');
    }

    const deleteBook = async book_id => {
        const response = await fetch(`/api/books/${book_id}`, {method: 'DELETE'});
        if (response.ok) {
            setBooks(books.filter(book => book.book_id !== book_id));
        } else {
            console.log('error');
        }
    };

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
    };

    React.useEffect(() => {
        fetchBooks();
    }
    , []);

    return (
        <div>
            <h3>Books</h3>
            <br />
            <h5>Add Book</h5>
            <input
                className={emptyFields.includes('title') ? 'error' : 'bookField'}
                type="text"
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
            <input
                className={emptyFields.includes('publication_date') ? 'error' : 'bookField'}
                type="text"
                placeholder="publication_date"
                value={publication_date}
                onChange={e => setPublicationDate(e.target.value)}
                />
            <button className="button-medium"
                onClick={addBook}
            >Add Book</button>

            <br /><br />
            <BooksTable books={books} editBook={editBook} deleteBook={deleteBook} />
        </div>
    );
}

export default BooksPage;