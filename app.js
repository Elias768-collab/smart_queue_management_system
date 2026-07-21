import express from "express";
import indexRoutes from "./routes/indexRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// import routes from authRoutes.js
import authRoutes from "./routes/authRoutes.js";

// creating an express application
const app = express();

// middleware to parse JSON data to Javascript object
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;