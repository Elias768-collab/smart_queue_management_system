import jwt from "jsonwebtoken";

/**
 * Middleware to verify JWT tokens.
 * Only authenticated users can have access to protected routes
 */

export const verifyToken = (req, res, next) => {

    // Authorization header
    const authHearder = req.headers.authorization;

    // Check if the header exists
    if(!authHearder) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided",
        });
    }

    // Remove bearer from the beggining of the token
    const token = authHearder.split(" ")[1];

    try{

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload to request
        req.existingUser = decoded;

        // Continue to the next middleware or controller
        next();

    }catch(error) {

        console.log(error);
        
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};