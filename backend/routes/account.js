const express = require("express");

const router = express.Router();

router.post("/send" , (req,res) => {
    res.send("Money sent");
})

module.exports = router;