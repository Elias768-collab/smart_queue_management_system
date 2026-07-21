import mongoose from "mongoose";

/**
 * Queue Schema
 * This represent a customer waiting in the queue
 */

const queueSchema = new mongoose.Schema(
    {
    
        /**
         * Reference to the user who joined the queue.
         * This creates a relationship between the Queue and User 
         */
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        
        /**
         * Queue number assigned to the customer.
         * Each customer gets a unique ticket number
         */
        ticketNumber: {
            type: Number,
            required: true,
            unique: true,
        },

        // Current queue status
        status: {
            type: String,
            enum: ["waiting", "serving", "served","cancelled"],
            default: "waiting",
        },

        // Time the customer joined the queue
        joinedAt: {
            type: Date,
            default: Date.now,
        },

        /**
         * Time the customer was served
         * Empty untill the service is completed
         */
        servedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Queue = mongoose.model("Queue", queueSchema);

export default Queue;