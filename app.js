// Importing express from the express packages
import express from "express";

// importing routes from indexRoutes.js
import indexRoutes from "./routes/indexRoutes.js";

// importing routes from testRoutes.js
import testRoutes from "./routes/testRoutes.js";

// import routes from authRoutes.js
import authRoutes from "./routes/authRoutes.js";

// creating an express application
const app = express();

// middleware to parse JSON data to Javascript object
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes)

export default app;