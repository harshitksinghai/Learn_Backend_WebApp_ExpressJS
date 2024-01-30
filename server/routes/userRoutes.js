import express from 'express';
// 2. import required functions from controllers and use them in routes
import {
    registerUser,
    authUser,
    logoutUser,
    getUserMainPage
} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router(); // express.Router() function creates a new router object. // A router in Express is a middleware and routing system that allows you to group routes and middleware, making your code more modular and organized.

// 1. define user routes that is required in your application 
// /api/users{}

// Register User - /
// Login User by authenticating - /auth
// Logout User - /logout
// Main Page for Authenticated Users - /main

// 3. Write code to define the specific routes and functions for requests (creating user route handlers)
router.post('/', registerUser); // final route will be /api/users/
router.post('/auth', authUser); // final route will be /api/users/auth
router.post('/logout', logoutUser); // final route will be /api/users/logout
router.get('/main', protect, getUserMainPage); // final route will be /api/users/main

export default router;