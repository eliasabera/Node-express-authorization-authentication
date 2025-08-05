const express = require("express");
const authMiddleWare = require("../middleware/auth-middle");
const {changePassword}=require('../controllers/auth-conroller')

const router = express.Router()
router.post('/update',authMiddleWare,changePassword)

module.exports = router;