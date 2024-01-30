import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt; // req.cookies.jwt retrieves the value of the jwt cookie which is then provided to the token variable
    if (token){
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET); // checks if the token has been tampered with
            req.user = await User.findById(decoded.userID).select('-password'); // userID was in the payload in jwt token, and this userID is now used to identify the user data in the database for further use. password field in database is excluded as it currently does not have any more purpose.
        } 
        catch (error) {
            res.status(401);
            throw new Error('Not authorised, invalid token');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
});

export {protect};