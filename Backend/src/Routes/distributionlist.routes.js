const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const Agent = require("../models/agent.model"); // your agent schema
const List = require("../models/distributionlist.model");   // new schema for storing distributed data
const listRouter= express.Router();

// * Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

listRouter.post("/upload", upload.single("data"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (!jsonData.length) {
      return res.status(400).json({ error: "Empty or invalid file" });
    }

    const agents = await Agent.find();
    if (agents.length < 5) {
      return res.status(400).json({ error: "Need at least 5 agents to distribute" });
    }

    const distributedData = [];
    const totalItems = jsonData.length;
    const agentCount = 5;

    let index = 0;
    for (let i = 0; i < agentCount; i++) {
      const itemsLeft = totalItems - index;
      const agentsLeft = agentCount - i;
      const count = Math.ceil(itemsLeft / agentsLeft);

      const assignedList = jsonData.slice(index, index + count);
      index += count;

      const listEntry = new List({
        agentId: agents[i]._id,
        agentName: agents[i].name,
        data: assignedList,
      });

      await listEntry.save();

      // 👇 push only clean data (without _id or __v)
      distributedData.push({
        agentName: agents[i].name,
        data: assignedList,
      });
    }

    res.json({
      message: "List uploaded and distributed successfully",
      data: distributedData,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Server error during upload" });
  }
});


module.exports = listRouter;
