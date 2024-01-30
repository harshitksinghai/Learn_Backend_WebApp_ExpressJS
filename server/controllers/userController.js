import asyncHandler from 'express-async-handler'; // this eliminates the need for try-catch blocks as it automatically catches the error and passes it to the error handling middleware. So, our functions in userController will be more neat and modular
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
        generateToken(res, user._id); // 'res' as we are using res.cookie in generateToken function, so 'res' is taken as input to access res.cookie
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

// @desc    Authenticate/Login a User
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email}); // this will return a js object that contains all the info of the matched user

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout User
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { // When you set a new cookie with the same name as an existing cookie, the browser automatically overwrites the existing cookie with the new one. 
        httpOnly: true,
        expires: new Date(0)
    }); 
    res.status(200).json({message: 'User Logged Out'});
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