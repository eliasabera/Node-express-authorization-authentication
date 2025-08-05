const express = require("express");
const authMiddleWare = require("../middleware/auth-middle");
const isAdmin = require("../middleware/admin-middleware");
const uploadMiddleWare = require("../middleware/upload-middleware");
const { uploadImageController,fetchImage } = require("../controllers/image-controller");

const router = express.Router();

router.post(
  "/upload",
  authMiddleWare,
  isAdmin,
  uploadMiddleWare.single("image"),
  uploadImageController
);

router.get('/get',authMiddleWare,isAdmin,fetchImage)

module.exports = router;
