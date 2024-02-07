const express = require("express");
const zod = require("zod");
const { Account } = require("../db");

const router = express.Router();


const balanceBody = zod.object({
   userId: zod.string()
})



router.post("/balance" , (req,res) => {
    const { success } = balanceBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {userId} = req.body;

    const account = Account.findOne({userId});

    res.json({
        balance:account.balance
    })

})

module.exports = router;