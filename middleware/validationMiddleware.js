/**
 * Generic validation middleware
 * Accepts any Joi
 */
export const validate = (schema) => {

    return (req, res, next) => {

        const {error} = schema.validate(req.body, {
            
            /**
             * This prevent Joi stopping at the first error
             * All the validation errors are recieved at once by the user
             * Not bit by bit
             */
            abortEarly: false,
        });
        
        if (error) {

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(detail =>({
                    field: detail.path[0],
                    message: detail.message,
                })),
            });

        }

        next()
      };
    };
