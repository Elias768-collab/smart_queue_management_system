import express from "express";
import { getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// protected profile route.
router.get("/profile", verifyToken, getProfile);

export default router;