const mongoose = require('mongoose');
// agent structure
const agentSchema = new mongoose.Schema({
    name:{
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
   },
   password: {
   type: String,
   required: true,    
   },
    mobile: {
    type: String,
    required: true,
    unique: true,
   // for the country cod

    match: [/^\+[\d\s-]{10,20}$/, 'Please enter a valid mobile number with country code'],

  },

    
});
// 'agent model data store in Db
const agentModel = mongoose.model('agent',agentSchema);

module.exports = agentModel