const {body, validationResult} = require('express-validator')
// validating the credentaials of admin

// Validates admin login credentials (email & password)
// Ensures correct format and minimum requirements
// Returns validation errors if any exist

const responseWithValidationErrors = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };
    next();
}

// Login validation rules
// Email must be valid
// Password must be at least 6 characters long

const loginUserValidations = [
    body('email')
    .isEmail()
    .withMessage('Invalid email address'),
    body('password')
    .isLength({min:6})
    .withMessage("password must be atleast 6 characters long"),
    responseWithValidationErrors
]
module.exports = loginUserValidations
