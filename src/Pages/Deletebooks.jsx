import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../Components/Home/Backbutton";
import axios from 'axios';

const Deletebooks = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        if (!id) {
            alert('Book ID is missing. Unable to delete.');
            console.error("Delete failed: Book ID is undefined.");
            return;
        }

        axios.delete(`https://as-backend1-ry1i.vercel.app/books/${id}`)
            .then(() => {
                alert('Book deleted successfully');
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
                alert('An error occurred while deleting the book. Please check the console for details.');
            });
    };

    return (
        <div className="p-4">
            <Backbutton />
            <h1 className="my-4">Delete Book</h1>
            <div className="d-flex flex-column justify-content-center border border-danger rounded-xl p-5">
                <h5 className="display-5 my-5 text-center">
                    Are you sure you want to delete this book?
                </h5>
                <button className="btn btn-danger btn-lg" onClick={handleDeleteBook}>
                    Yes, Delete it
                </button>
            </div>
        </div>
    );
};

export default Deletebooks;
