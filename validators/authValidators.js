import Joi from "joi";

/**
 * Validation schema for user registration
 */
export const registerSchema = Joi.object({

    fullname: Joi.string()
        .trim()
        .min(4)
        .max(100)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(7)
        .required(),
});


/**
 * Validation schema for user login
 */
export const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required(),

});