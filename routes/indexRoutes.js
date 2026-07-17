// importing express packages
import express from "express";

import {welcome} from "../controllers/indexController.js";

// creating a mini router
const router = express.Router();

router.get("/", welcome);

// makes the router available to app.js
export default router;
