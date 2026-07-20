import {
    registerUserService,
    loginUserService
} from "../services/authService.js";

export const registerUser = async(req, res) => {
    const result = await registerUserService(req.body);

    res.status(201).json(result);
       
};

// Handles user login requests
export const loginUser = async (req, res) => {
    const result = await loginUserService(req.body);

    if(!result.success) {
        return res.status(401).json(result);
    }
    
    return res.status(200).json(result);
};