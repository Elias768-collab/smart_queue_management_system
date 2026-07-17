export const welcome = (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are Welcome to Smart Queue Management System API",
    });
}