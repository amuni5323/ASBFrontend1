import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import BooksTable from "../Components/Home/BooksTable";


const Home = () => {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(true); 
    const usernameLocal = localStorage.getItem('token');
    console.log("token ", usernameLocal)
    const username = localStorage.getItem('username');

    if (usernameLocal == null) {
        navigate('/');
    }
    console.log(usernameLocal);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }
    useEffect(() => {
        if (!usernameLocal) return; // Don't try fetching books if there's no token

        // Fetch user details (including email verification status)
        axios.get('https://backend-book-499o.onrender.com/user/profile', {
            headers: {
                'Authorization': `Bearer ${usernameLocal}`
            }
        }).then((response) => {
            console.log("User Data:", response);
            // Assuming the response contains a `verified` field to check if the email is verified
            setIsVerified(response.data.verified);

            // If email is not verified, prompt user to verify
            if (!response.data.verified) {
                enqueueSnackbar('Please verify your email to access the books.', { variant: 'warning' });
            } else {
                // Fetch books if the email is verified
                axios.get('https://backend-book-499o.onrender.com/books', {
                    headers: {
                        'Authorization': `Bearer ${usernameLocal}`
                    }
                }).then((Response) => {
                    console.log("Fetched Books:", Response);
                    setBooks(Response.data.data);
                }).catch((error) => {
                    console.log(error);
                });
            }
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
                <h1 className='lead display-4 mt-5'> Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='display-5' />
                </Link>

                {/* <CiSquarePlus className='display-5' /> */}
                <span className="mx-2">Welcome, {username} !</span>
                <button className="btn btn-primary my-3"
                    onClick={handleLogOut}>Logout</button>
            </div>

            {/* Show a message if the email is not verified */}
            {!isVerified && (
                <div className="alert alert-warning">
                    <p>Your email is not verified. Please check your inbox for the verification email.</p>
                    <Link to="/verify-email">Resend Verification Email</Link>
                </div>
            )}

            {/* Display the list of books if the email is verified */}
            {isVerified && (
                <BooksTable books={books} handleNewBook={handleNewBook} />
            )}
        </div>
    )
}

export default Home;
