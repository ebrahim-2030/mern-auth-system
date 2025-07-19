import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import the database connection function
import {connectToDB} from "./config/db.js";
// import user auth routes
import authRoutes from './routes/user.route.js';   

// load environment variables from .env file
dotenv.config();

// create an instance of express
const app = express();

// middleware to parsing json requests
app.use(express.json());

// meddleware to parse cookies
app.use(cookieParser());

// connect to the database
connectToDB();

// defaul route
app.get('/', (req, res) => {
    res.send("Server is ready!");
});

// user auth routes
app.use("/api/auth", authRoutes);

// use environment port or default to 3000
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
}); 

