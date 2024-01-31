import express from "express";
import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env. 
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config(); // reads the .env file, assigns the key-value pairs in .env file to the process.env object
connectDB();
const app = express(); // express() function returns an object that is referenced by variable 'app' (app can be called an object as it is referencing an object). The object contains methods and properties.
const port = process.env.PORT;

// The app.use() method in Express is used to mount middleware functions or routers in the application's middleware stack.
app.use(express.json()); // The express.json() middleware checks the Content-Type header of the incoming request. If the Content-Type is application/json, it attempts to parse the request body as JSON and populates req.body with the parsed JSON data. If the Content-Type is not application/json, the middleware ignores the request body, and req.body remains an empty object.
app.use(express.urlencoded({extended: true})); // The express.urlencoded({ extended: true }) middleware checks the Content-Type header of the incoming request. If the Content-Type is application/x-www-form-urlencoded, it attempts to parse the request body as URL-encoded data and populates req.body with the parsed data. If the Content-Type is not application/x-www-form-urlencoded, the middleware ignores the request body, and req.body remains an empty object.

app.use(cookieParser()); // This middleware will parse the incoming Cookie header and populate req.cookies with an object representing the parsed cookies.

app.use('/api/users', userRoutes); // userRoutes router will handle requests that start with '/api/users'.

app.get('/', (req, res) => { // when client/user access URL '/' for HTTP GET request, this function will execute // req = request object representing HTTP request from client // res = response object representing the HTTP response that will be sent to the client.
    res.send("Server up and running!");
});

app.use(notFound); // this is a middleware // this line of code is written after all route handlers for handling HTTP requests. // i think the reason is that if code has reached this line, means none of the route handlers were executed, so this middleware then gives NOT FOUND error.
app.use(errorHandler); // this is an error handling middleware (to know more, go into errorMiddleware.js) and it can only be invoked if next(error) is called by some code, so then error-handling middleware will handle the error 

app.listen(port, ()=>{ // This line starts the Express application to listen for incoming HTTP requests on the specified port (port).
    console.log("Server running on port 3000");
});