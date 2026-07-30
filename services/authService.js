import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/**
 * Register new user
 * Checks if the email already exist
 */
export const registerUserService = async(userData) => {
    
    try{
        //check if a user already exist using the same email
        const existingUser = await User.findOne({
            email: userData.email
        });
         
        if(existingUser) {
            return {
                success: false,
                message: "Email already exists"
            };
        }

     // Hash the user password before saving it 
     const hashedPassword = await bcrypt.hash(userData.password, 10);

    //  Create a new user with the hashed password
    const user = {
        ...userData, 
        password: hashedPassword,};

     // Save the new user details to database
    const newUser = await User.create(user);

    /**
     * Prepare a secure response
     * Don't send the password back to the client
     */
    const responseData = {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        createdAt: newUser.createdAt,
    };

    return{
        success: true,
        message: "Registration Successful",
        data: responseData
    };
    
    }catch(error) {
        console.log(error);

        return{
            success: false,
            message: "Registration Failed.",
            error: error.message
        };
    }
}


// Authenticate a user using email and password.
export const loginUserService = async(loginData) => {

    try{
        const existingUser = await User.findOne({
           email: loginData.email 
        });

        if(!existingUser) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        // Compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(
            loginData.password,
            existingUser.password,
        );

        if(!passwordMatch) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        // preparing a secure login
        const responseData = {
            id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email
        };

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            {
                id:existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
               process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        );

        return {
            success: true,
            message: "Successful login",
            token,
            data: responseData,
        };


    } catch(error) {
        return{
            success: false,
            message: "Failed to login",
            error: error.message,
        };
    }
    
};