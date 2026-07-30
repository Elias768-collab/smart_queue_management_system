import express from "express";
import { 
    joinQueue,
    getQueuePosition,
    getWaitingQueue,
    callNextCustomer,
    markCustomerServed,
    getQueueStatistics
 } from "../controllers/queueController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * Join the queue
 * Only authenticated users can have access and join queue
 */

router.post("/join", verifyToken, joinQueue,);

// Get authenticated user's queue position
router.get("/position", verifyToken, getQueuePosition);

/**
 * Get  queue statistics
 */
router.get("/stats", verifyToken, isAdmin, getQueueStatistics)

/**
 * Get all customers currently waiting in the queue.
 * Admin Get all customers on the queue
 */
router.get("/", verifyToken, isAdmin, getWaitingQueue);

/**
 * Call the next waiting customer.
 * Admin call the next customer
 */
router.put("/call-next", verifyToken, isAdmin, callNextCustomer);

/**
 * Mark customer served
 * Admin mark customer as served
 */
router.put("/serve", verifyToken, isAdmin, markCustomerServed);

export default router;