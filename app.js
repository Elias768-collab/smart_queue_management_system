// Importing express from the express packages
import express from "express";

// importing routes from indexRoutes.js
import indexRoutes from "./routes/indexRoutes.js";

// creating an express application
const app = express();

app.use("/", indexRoutes)

export default app;