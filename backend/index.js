require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

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

const router = express.Router();

app.use(router);

app.use(cors());

app.use(express.json());

app.post('/signup' , (req,res) => {
    const {firstName , lastName , email , password} = req.body;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    res.send("Data recieveed successfully");
})

app.listen(port,()=> console.log(`app is running on port ${port}`));

