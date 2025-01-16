import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import BooksTable from "../Components/Home/BooksTable";

const Home = () => {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const usernameLocal = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    // Redirect to login if no token is found
    if (usernameLocal == null) {
        navigate('/');
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    useEffect(() => {
        if (!usernameLocal) return; // Don't fetch books if there's no token

        // Fetch books
        axios.get('https://backend-book-499o.onrender.com/books', {
            headers: {
                'Authorization': `Bearer ${usernameLocal}`
            }
        }).then((response) => {
            console.log("Fetched Books:", response);
            setBooks(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [usernameLocal]); // Re-run effect when usernameLocal changes

    // Function to add a new book and update the state
    const handleNewBook = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]); // Add the new book to the list
    };

    return (
        <div className='container p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='lead display-4 mt-5'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='display-5' />
                </Link>
                <span className="mx-2">Welcome, {username}!</span>
                <button className="btn btn-primary my-3"
                    onClick={handleLogOut}>Logout</button>
            </div>

            {/* Display the list of books */}
            <BooksTable books={books} handleNewBook={handleNewBook} />
        </div>
    );
}

export default Home;
