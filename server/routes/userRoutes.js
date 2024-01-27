import express from 'express';
// 2. import required functions from controllers and use them in routes



const router = express.Router(); // express.Router() function creates a new router object. // A router in Express is a middleware and routing system that allows you to group routes and middleware, making your code more modular and organized.

// 1. define user routes that is required in your application 
// /api/users{}

// Register User - /
// Login User by authenticating - /auth
// Logout User - /logout
// Main Page for Authenticated Users - /main

// 3. Write code to define the specific routes and functions for requests