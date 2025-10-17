const mongoose = require('mongoose');
// user/admin Schema structure 
const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true,
   },
   password: {
   type: String,
   required: true,    
   }
    
});
//'user' created in the database compase
const userModel = mongoose.model('user',userSchema);

module.exports = userModel