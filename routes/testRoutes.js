// importing express packages
import express from "express";

import { receiveData } from "../controllers/testController.js";

const router = express.Router();

// sending request/ data to the server
router.post("/", receiveData);

export default router;
