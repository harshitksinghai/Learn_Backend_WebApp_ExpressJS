import asyncHandler from 'express-async-handler'; // this eliminates the need for try-catch blocks as it automatically catches the error and passes it to the error handling middleware. So, our functions in userController will be more neat and modular
import User from '../models/userModel.js';

// @desc    Register a User
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => { // async and await are explained in TermsMeaning.txt
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email }); // if no matching data/value is found, return null, otherwise return value. So if there is value assigned to userExists, then it will output true in if(userExists)
    if (userExists) {
        res.status(400);
        throw new Error('User already Exists');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

// @desc    Authenticate a User
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.json({ message: 'login user' });
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.json({ message: 'logout user' });
});

// @desc    Get user main page
// route    GET /api/users/main
// @access  Private
const getUserMainPage = asyncHandler(async (req, res) => {
    res.json({ message: 'main page' });
});

export { // these functions can now be imported and then used in other files
    registerUser,
    authUser,
    logoutUser,
    getUserMainPage
};