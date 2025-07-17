import express from 'express';
import dotenv from 'dotenv';
import {connectToDB} from "./config/db.js";

// load environment variables from .env file
dotenv.config();

// create an instance of express
const app = express();

// middleware to parsing json
app.use(express.json());

// connect to the database
connectToDB();

// defaul route
app.get('/', (req, res) => {
    res.send("Server is ready!");
});

// use environment port or default to 3000
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
}); 

