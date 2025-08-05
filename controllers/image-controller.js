const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../models/image");
const fs = require('fs');
const cloudinary=require('../config/cloudinary')

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "file required",
      });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const newelyUploadedImage = new Image({
      url,
      publicId,
      uploadeBy: req.userInfo.userId,
    });
    await newelyUploadedImage.save();

    res.status(200).json({
      success: true,
        message: "image uploaded successfuly",
      image:newelyUploadedImage  
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong please try again",
    });
  }
};
const fetchImage = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'crearedAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImage = await Image.countDocuments();
    const totalpage = Math.ceil(totalImage / limit);

    const sortObj = {}
    sortObj[sortBy]=sortOrder

      const images=await Image.find().sort(sortObj).skip(skip).limit(limit)
        if (images) {
            res.status(200).json({
              success: true,
              currentPage: page,
              totalpage: totalpage,
              totalImage:totalImage,
                data:images
            })
        }
    }
    catch (e) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "something went wrong please try again",
        });
    }
}

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdofImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentIdofImageToBeDeleted);
    
    if (!image) {
      return res.status(400).json({
        success: false,
        message:"image not found"
      })
    }
    

    if (image.uploadeBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "you are not authorize to delete this image",
      });
    }
    await cloudinary.uploader.destroy(image.publicId)
    await Image.findByIdAndDelete(getCurrentIdofImageToBeDeleted)

    res.status(200).json({
      success: true,
      message:"image deleted successfuly"
    })

  } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "something went wrong please try again",
      });
  }
}

module.exports = {
  uploadImageController,fetchImage,deleteImageController
};

