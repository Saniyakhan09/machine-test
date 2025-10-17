const csv = require("csvtojson");
const xlsx = require("xlsx");
const listModel = require("../models/distributionlist.model");
const agentModel = require("../models/agent.model");

async function uploadAndDistribute(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    let records = [];

    //  CSV or Excel
    if (req.file.mimetype === "text/csv") {
      records = await csv().fromString(req.file.buffer.toString());
    } else {
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      records = xlsx.utils.sheet_to_json(worksheet);
    }

    //  columns
    const requiredCols = ["FirstName", "Phone", "Notes"];
    const invalid = records.some(
      (r) => !r.FirstName || !r.Phone || !r.Notes
    );
    if (invalid)
      return res
        .status(400)
        .json({ message: "Invalid file format. Check column names." });

    // Get agents
    const agents = await agentModel.find();
    if (agents.length === 0)
      return res.status(400).json({ message: "No agents found" });

    // Distribute equally
    const distributed = [];
    records.forEach((item, index) => {
      const agentIndex = index % agents.length; 
      distributed.push({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
        assignedTo: agents[agentIndex]._id,
      });
    });

    // Save to DB
    await listModel.insertMany(distributed);

    res.json({
      message: "File uploaded and distributed successfully!",
      total: distributed.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing file" });
  }
}

// Get all lists for frontend display
async function getAllLists(req, res) {
  try {
    const lists = await listModel
      .find()
      .populate("assignedTo", "name email mobile");
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lists" });
  }
}

module.exports = { uploadAndDistribute, getAllLists };
