import express from 'express';
import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

// create an instance of express
const app = express();

// use environment port or default to 3000
const PORT = process.env.PORT || 3000;

// test get route
app.get('/', (req, res) => {
    res.send("Server is ready!");
})

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

