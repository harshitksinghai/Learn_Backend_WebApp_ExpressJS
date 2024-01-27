import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Server up and running!");
});

app.listen(port, ()=>{
    console.log("Server running on port 3000");
});