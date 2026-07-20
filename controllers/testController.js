export const receiveData = (req, res) => {
    
    res.status(200).json({
        success: true,
        message: "Your data has been received successfully",
        data: req.body,
    });
}