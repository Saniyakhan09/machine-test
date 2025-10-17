const express = require('express')
const Agentrouter = express.Router();

const {Agent, allAgent} = require('../controller/agent.controller')
// getting frontend data by post method '/add' for creating the agent and '/all' to show all agents
Agentrouter.post('/add', Agent)
Agentrouter.get('/all', allAgent)


module.exports = Agentrouter
