import express from "express";
import indexRoutes from "./routes/indexRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";

// import routes from authRoutes.js
import authRoutes from "./routes/authRoutes.js";

// creating an express application
const app = express();

// middleware to parse JSON data to Javascript object
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/queue", queueRoutes);

export default app;