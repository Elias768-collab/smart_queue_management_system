// Importing dotenv to read values from .env files
import dotenv from "dotenv";

// Importing express from app.js
import app from "./app.js";

// This load .env file
dotenv.config();

const PORT = process.env.PORT || 3005;

// This listen for incoming request from users
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});