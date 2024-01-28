const zod = require("zod");
const express = require("express");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const { firstName, lastName, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username }); 

        if (existingUser) { 
            return res.status(411).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        })

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(200).json({
            message: "User created successfully",
            token: token
        })
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }


})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {

    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {username , password} = req.body;

    try{

        const user = await User.findOne({username});

        if(!user)
        {
            return res.status(411).json({
                message: "No such user exists"
            })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
        {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(200).json({
            message:"Login successfull",
            token:token
        })
    }
    catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }



})


module.exports = router;