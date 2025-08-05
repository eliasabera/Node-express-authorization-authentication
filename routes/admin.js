const express = require("express");
const authMiddleWare = require("../middleware/auth-middle");
const isAdmin=require('../middleware/admin-middleware')

const adminrouter = express.Router();

adminrouter.get("/welcome", authMiddleWare,isAdmin, (req, res) => {
  res.json({
    message: "welcome to admin page",
  });
});

module.exports = adminrouter;
