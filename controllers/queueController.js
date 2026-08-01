// import the queue service
import { 
     joinQueueService,
     getQueuePositionService,
     getWaitingQueueService,
     callNextCustomerService,
     markCustomerServedService,
     getQueueStatisticsServices
 } from "../services/queueServices.js";

/**
 * Controlller to handle joining queue
 */
export const joinQueue = async (req, res) => {

    // Get the authenticated user's ID from the JWT middleware
    const userId = req.existingUser.id;
    
    // Call the service layer
    const result = await joinQueueService(userId);
     
     // If there is an issue
   if (!result.success) {
        return res.status(400).json(result);
   }

   return res.status(201).json(result);
};


/**
 * Controller to get authenticated user's queue position
 */
export const getQueuePosition = async (req, res) => {

     // Get the authenticated user's ID from the JWT middleware
     const userId = req.existingUser.id;

     // Call the service
     const result = await getQueuePositionService(userId);

     // If there is an issue
     if(!result.success) {
          return res.status(404).json(result);
     }

     // Otherwise, return the queue position
     return res.status(200).json(result);
};

/**
 * Get all waiting customers.
 *  */
export const getWaitingQueue = async(req, res) => {
 
     const result = await getWaitingQueueService();

     // Return an error if service fails
     if(!(await result).success) {
          return res.status(500).json(result);
     }

     return res.status(200).json(result);
};

/**
 * Call the next customer in the queue
 */
export const callNextCustomer = async (req, res) => {

     const result = await callNextCustomerService();

     if(!result.success) {
          return res.status(404).json(result);
     }
     
     return res.status(200).json(result);
}

/**
 * Mark the currently serving customer as served
 */
export const markCustomerServed = async (req, res) => {

     const result = await markCustomerServedService();

     if(!result.success) {
          return res.status(404).json(result);
     }

     return res.status(200).json(result);
};


/**
 * Get queue statistics
 */
export const getQueueStatistics = async(req, res) => {

     const result = await getQueueStatisticsServices();

     if(!result.success) {
          return res.status(500).json(result);
     }


     return res.status(200).json(result);
};