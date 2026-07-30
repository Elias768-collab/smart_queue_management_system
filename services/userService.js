import User from "../models/User.js";

/**
 * Get the authenticated user's profile.
 * @param {string} userId
 * @returns {Object}
 */
export const getProfileService = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return {
                success: false,
                message: "User not found.",
            };
        }

        return {
            success: true,
            message: "Profile retrieved successfully.",
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            message: "Failed to retrieve profile.",
            error: error.message,
        };
    }
};