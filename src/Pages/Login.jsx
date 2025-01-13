import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../Models/UserModels.js';

const router = express.Router();

// Route for user signup
router.post('/SignUp', async (request, response) => {
    try {
        const { username, email, password } = request.body;

        // Validate input
        if (!username || !email || !password) {
            return response.status(400).json({ message: 'All fields are required' });
        }

        // Check if the username or email is already registered
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return response.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return response.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
});

// Route for user login
router.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;

        // Validate input
        if (!username || !password) {
            return response.status(400).json({ message: 'Username and password are required' });
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userid: user._id, isLogged: true },
            process.env.JWT_SECRET || 'default_secret_key',
            { expiresIn: '1h' }
        );

        return response.status(200).json({ message: 'Login successful', token, username: user.username });
    } catch (error) {
        console.error('Error during login:', error);
        response.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
