// Importing dotenv to read values from .env files
import dotenv from "dotenv";

// Importing express from app.js
import app from "./app.js";

//Importing connectDB from db.js
import connectDB from "./config/db.js";

// This load .env file
dotenv.config();
connectDB();

const PORT = process.env.PORT || 3005;

// This listen for incoming request from users
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
