// Return the authentication user's profile
export const getProfile = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        data: req.user,
    });
};