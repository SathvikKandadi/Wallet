const express = require("express");
const zod = require("zod");
const { Account } = require("../db");

const router = express.Router();


const balanceBody = zod.object({
   userId: zod.string()
})



router.post("/balance" , async (req,res) => {
    const { success } = balanceBody.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }
    
    const { userId } = req.body;
    try {
        const account = await Account.findOne({ userId });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            balance: account.balance
        });
    } catch (error) {
        console.error("Error retrieving account balance:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }

})

module.exports = router;