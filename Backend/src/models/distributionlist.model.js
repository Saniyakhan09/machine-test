const mongoose = require("mongoose");
// for distributing file data to ecah agent 
const listSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  agentName: String,
  data: [
    {
      FirstName: String,
      Phone: String,
      Notes: String,
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
