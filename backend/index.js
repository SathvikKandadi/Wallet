const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rootRouter = require("./routes/index");
require('dotenv').config(); 

const app = express();


const port = 3000;

// npm i dotenv 
// uri is extracted from .env file where URI = "place your mongo URI here"
const uri = process.env.URI;




if (!uri) {
    console.error('MongoDB URI is not defined in the environment variables.');
    process.exit(1);
  }


mongoose.connect(uri , { dbName: "wallet"})

app.use(cors());

app.use(express.json()); // To parse json data incoming from req body

app.use("/api/v1" , rootRouter); 










app.listen(port,()=> console.log(`app is running on port ${port}`));

