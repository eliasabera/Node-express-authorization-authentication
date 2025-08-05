const express = require("express");
const authMiddleWare=require('../middleware/auth-middle')

const homerouter = express.Router();

homerouter.get('/welcome',authMiddleWare, (req, res) => {
    res.status(200).json({
        message: "welcome to home page",
        user: [
            {
                username: req.userInfo.username,
                role:req.userInfo.role
            }
        ]
    })
})

module.exports = homerouter;
