import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        // connect to the mongodb database using the uri from the environment variable
        await mongoose.connect(process.env.MONGO_URI);

        // log the success message 
        console.log("CONNECTED TO MONGODB");
    } catch (err) {
        // log the error message
        console.error("ERROR CONNECTING TO MONGODB:", err.message);
        
        // exit the process with failure
        process.exit(1); 

    }
}