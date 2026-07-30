/**
 * Middleware to allow only administrators
 */
export const isAdmin = (req, res, next) => {

    // Check if the authenticated user is an admin
    if(req.existingUser.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }

    // Continue if the user is an admin
    next();
}