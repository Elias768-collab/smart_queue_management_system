import mongoose from "mongoose";

//Define the structure and validation rules for a user document.
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required: true,
        },

        role: {
            type: "String",
            enum: ["customer", "admin"],
            default: "customer",
        }
    },
    {
        timestamps: true,
    }
);

//From the schema, create the user model
const User = mongoose.model("User", userSchema);

export default User
