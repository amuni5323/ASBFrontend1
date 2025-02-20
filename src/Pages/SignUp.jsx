import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignUp = () => {

        if (!username || !email || !password) {
            enqueueSnackbar('All fields are required', { variant: 'warning' });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            enqueueSnackbar('Invalid email format', { variant: 'warning' });
            return;
        }

        axios.post('https://backend-book-499o.onrender.com/user/signup', { username, email, password })
            .then(() => {
                enqueueSnackbar('Sign Up successful! Please check your email to verify your account.', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                if (error.response) {
                    // Handle specific errors based on status code
                    if (error.response.status === 400) {
                        enqueueSnackbar('Email and password are required', { variant: 'error' });
                    } else if (error.response.status === 409) {
                        enqueueSnackbar('User with this email already exists', { variant: 'error' });
                    } else if (error.response.status === 500) {
                        enqueueSnackbar('Signup failed, please try again later', { variant: 'error' });
                    } else {
                        enqueueSnackbar('Something went wrong. Please try again', { variant: 'error' });
                    }
                } else if (error.request) {
                    enqueueSnackbar('No response from server. Please try again later', { variant: 'error' });
                } else {
                    enqueueSnackbar('Error in signup process. Please try again later', { variant: 'error' });
                }
                console.log(error);
            });
    };

    return (
        <div className="p-4">
            <h1 className="mx-4 my-4">Sign Up</h1>
            <div className="p-4">
                <div className="my-4">
                    <label className="mx-3 mr-4">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="px-4 py-2"
                        name="username"
                    />
                </div>
                <div className="my-4">
                    <label className="mx-3 mr-4">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="px-4 py-2"
                        name="email"
                    />
                </div>
                <div className="my-4">
                    <label className="mx-3 mr-4">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="px-4 py-2"
                        name="password"
                    />
                </div>
                <button
                    className="btn btn-primary mx-4 my-2 p-2"
                    style={{ width: 300 }}
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
                <div>
                    <p className="mx-4">
                        Already have an account? <Link to="/">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
