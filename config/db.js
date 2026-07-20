// importing  library that communicate with MongoDB
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        // Reading connection string from .env
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connection successful");

    //Prints out error messgae incase of wrong password,no connection
    }catch(error) {
        console.log("MongoDB connection failed");
        console.log(error.message);
        
        // Stop the server incase of an error
        process.exit(1);
    }
};

export default connectDB;