// Import the queue model
import Queue from "../models/queue.js";

// Allow an authenticated user to join the queue
export const joinQueueService = async(userId) => {
    
    try {
        /**
         * Check if the user is already waiting on the queue
         * User with multiple active queue entries not allowed
         */
        const existingUser = await Queue.findOne({
            user: userId,
            status: {
                $in: ["waiting", "serving"],
            }
        });

        if(existingUser) {
            return{
                success: false,
                message: "You are already in the queue."
            };
        }

        /**
         * Find the customer with the highest ticket number
         * Sorting record in a descending order
         */
        const lastQueue = await Queue.findOne()
                .sort({ ticketNumber: -1});

        /**
         * Generate the next ticket number.
         */
        const nextTicketNumber = lastQueue ?
            lastQueue.ticketNumber + 1 
            : 1;

        // Create the new queue entry
        const queue = await Queue.create({
            user: userId,
            ticketNumber: nextTicketNumber 
        });
        
        return {
            success: true,
            message: "Successfully joined the queue.",
            data: queue,
        };

    } catch(error) {

       console.log(error);
       
       return{
        success: false,
        message: "Failed to join queue",
        error: error.message
       };
    }
};

export const getQueuePositionService = async (userId) => {

    try{

        // Find the user's active queue entry
        const queue = await Queue.findOne({
            user: userId,
            status: "waiting",
        });

        // If the user is not waiting, run an error
        if (!queue){
            return {
                success: false,
                message: "You are not currently on the queue.",
            };
        }

        //Count how many waiting customers have a smaller ticket number
        const peopleAhead = await Queue.countDocuments({
            status: "waiting",
            ticketNumber: {
                $lt: queue.ticketNumber
            }
        });

        return {
            success: true,
            message: "Queue position retrieved.",
            data: {
                ticketNumber: queue.ticketNumber,
                position: peopleAhead + 1,
                status: queue.status
            }
        };

    }catch (error) {

        console.log(error);

        return{
            success: false,
            message: "Failed to retrieve queue position.",
            error: error.message
        };
    }
};


/**
 * Get all customers currently waiting in the queue.
 */
export const getWaitingQueueService = async () => {

    try {

        // Find all queue entries with waiting status
        const queue = await Queue.find({
            status: "waiting"
        })

        // Populate user details
        .populate("user", "fullname email")

        // Sort by ticket number in ascending order
        .sort({
            ticketNumber: 1
        });

        return {
            success: true,
            message: "Queue retrieved successfully",
            data: queue,
        };

    } catch (error) {

        console.log(error);

        return {
            success: false,
            message: "Failed to retrieve queue.",
            error: error.message,
        };

    }

};


/**
 * 
 * Logic for calling next customer on the queue
 * Call the next waiting customer.
 */
export const callNextCustomerService = async() => {

    try{

        // Find the first waiting customer
        const nextCustomer = await Queue.findOne({
            status: "waiting"
        })
        .sort({ ticketNumber: 1 })
        .populate("user", "fullname email");

        // Check if anyone is waiting
        if(!nextCustomer) {
            return{
                success: false,
                message: "No customers are waiting in the queue."
            }
       };

        // update customer status
            nextCustomer.status = "serving";

            // Save the change
            await nextCustomer.save();

            return{
                success: "true",
                message: "Next customer called successfully.",
                data: nextCustomer
        };


    }catch(error) {
        
        console.log("error");

        return {
            success: false,
            message: "Failed to call next customer.",
            error: error.message
        };
    }
};

/**
 * Mark the customer currently being served as served
 */
export const markCustomerServedService = async () => {

    try {

        // Find customer currently being served
        const servingCustomer = await Queue.findOne({
            status: "serving"
        });

        // If no one is currently beign served
        if(!servingCustomer) {
            return{
                success: false,
                message: "No customer is currently being served."
            };
        }

        // Update status
        servingCustomer.status = "served"

        // Save changes
        await servingCustomer.save();
        
        return {
            success: true,
            message: "Customer marked as served.",
            data: servingCustomer
        };

    }catch(error) {

        console.log(error)

        return {
            success: false,
            message: "Failed to mark customer as served."
        };
    }
};


/**
 * Get queue statistics
 */
export const getQueueStatisticsServices = async() => {

    try {

        const waiting = await Queue.countDocuments({
            status: "waiting"  
        });

        const serving = await Queue.countDocuments({
            status: "serving"
        });

        const served = await Queue.countDocuments({
            status: "served"
        });

        const total = await Queue.countDocuments();

        return{
            success: true,
            message: "Queue statistics retrieved successfully.",
            data :{
                waiting,
                serving,
                served,
                total,
            },
        };
    } catch(error) {

        console.log(error);

        return {
            success: false,
            message: "Failed to retrieve queue statistics.",
            error: error.message,
        };
    }
};