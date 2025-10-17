const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//admin register
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

   const hashedPassword = await bcrypt.hash(password, 10);
   
// creatin the admin credential 
    const admin = await userModel.create({
    email,
    password: hashedPassword,
})

return res.status(201).json({
 meassge: "admin register succesfuuly",
 admin: { id: admin._id, email: user.email },

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
 const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
// token to admin
const token = jwt.sign(
    { id: admin._id, email: admin.email},
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
); 

   res.cookie("token", token, {
    httpOnly: true,
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