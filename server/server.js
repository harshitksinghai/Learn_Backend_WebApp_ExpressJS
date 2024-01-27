import express from "express";
import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env. 

dotenv.config(); // reads the .env file, assigns the key-value pairs in .env file to the process.env object

const app = express(); // express() function returns an object that is referenced by variable 'app' (app can be called an object as it is referencing an object). The object contains methods and properties.
const port = process.env.PORT;

app.get('/', (req, res) => { // when client/user access URL '/' for HTTP GET request, this function will execute // req = request object representing HTTP request from client // res = response object representing the HTTP response that will be sent to the client.
    res.send("Server up and running!");
});

app.listen(port, ()=>{ // This line starts the Express application to listen for incoming HTTP requests on the specified port (port).
    console.log("Server running on port 3000");
});