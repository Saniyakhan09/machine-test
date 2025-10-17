const agentModel = require('../models/agent.model');
const bcrypt = require('bcryptjs');

// Creating agent
async function Agent(req, res) {
  console.log('Request body:', req.body);
  try {
    const { name, email, password, mobile } = req.body;

    // Checking email
    const existingEmail = await agentModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Checking mobile
    const existingMobile = await agentModel.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: "Mobile number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create agent
    const agent = await agentModel.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    return res.status(201).json({
      message: "Agent added successfully",
      agent: { id: agent._id, email: agent.email, mobile: agent.mobile },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
}
async function allAgent(req, res) {
  try {
    const agents = await agentModel.find();
    res.status(200).json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
}
module.exports = {Agent, allAgent};
