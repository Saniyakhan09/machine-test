const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Creating  a admin login 
// validates emails and password uniqueness
//hashing the password before saving
// JWT token for admin authentication
//returning the created admin details


//admin register
//checking if the admin already exists
async function registerUser(req,res){
    console.log('Request body:', req.body);
try{
 const{email,password} = req.body;
    const adminexisting = await userModel.findOne({email});
    if(adminexisting){
        return res.status(400).json({
            message: "Admin already exists"
        })
    }

// Hash password before saving
   const hashedPassword = await bcrypt.hash(password, 10);
   
// creating the new  admin 
    const admin = await userModel.create({
    email,
    password: hashedPassword,
})

return res.status(201).json({
 meassge: "admin register succesfuuly",
 admin: { id: admin._id, email: admin.email },

})
 } catch(err){
        console.log(err)
        return res.status(500).json({
            message:"server error"
        })
    }
}

// admin login 
async function loginUser(req,res){

    try{
    const{email,password} = req.body;
    const admin = await userModel.findOne({email})

   if(!admin){
     return res.status(404).json({
        message:" Admin not found ",
    });
}

 // Compare entered password with hashed password
 const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Please check the password" });
    }

// Generate JWT token for admin authentication
const token = jwt.sign(
    { id: admin._id, email: admin.email},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
); 

// Store JWT in secure cookie
    res.cookie("token", token, {
    httpOnly: true, // ensures cookie is sent only over HTTPS
    secure:true, 
    sameSite: "strict",
    maxAge:24*60*60*1000 
   });

   return res.status(201).json({message:"Admin login successful", token, admin:{id:admin._id, email: admin.email}})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Server error"})
    }
   
}
module.exports = {loginUser,registerUser}