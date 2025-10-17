const express = require('express')
const router = express.Router();
const loginUserValidations = require('../middleware/validators.middleware')

const {loginUser,registerUser} = require('../controller/auth.controller')

router.post("/login", loginUserValidations, loginUser)
router.post("/register",registerUser)

module.exports = router
