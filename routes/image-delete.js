const express = require("express");
const authMiddleWare = require("../middleware/auth-middle");
const isAdmin = require("../middleware/admin-middleware");
const { deleteImageController } = require("../controllers/image-controller");


const router = express.Router()

router.delete('/:id',authMiddleWare,isAdmin,deleteImageController)


module.exports=router