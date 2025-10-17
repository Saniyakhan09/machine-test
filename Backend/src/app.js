const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
//routing for the user
const router = require('../src/Routes/auth.routes')
// from the agent creating 
const Agentrouter = require('../src/Routes/agent.routes')
//from the disrtibutuing the upload csv files
const listRouter = require('./Routes/distributionlist.routes');

const app = express()
//frontend running in 5173 
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));

app.use(express.json())
//admin route
app.use('/auth',router)  
//agents route
app.use('/agent',Agentrouter)
//distributing route
app.use('/list', listRouter);
app.use(cookieParser());

module.exports = app