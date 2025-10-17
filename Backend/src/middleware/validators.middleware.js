const {body, validationResult} = require('express-validator')
// validating the credentaials of admin
const responseWithValidationErrors = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };
    next();
}

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
