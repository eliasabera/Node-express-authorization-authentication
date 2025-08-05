const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExistCheck = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (userExistCheck) {
      return res.status(401).json({
        success: false,
        message: "username or email exist try another one",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = await User.create({
      username,
      email,
      password: hashpassword,
      role: role || "user",
    });

    if (newlyCreatedUser) {
      res.status(200).json({
        success: true,
        message: "user registerd successfuly",
        data: newlyCreatedUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "failed to register something wrong",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not exists",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "invalid password",
      });
    }

    const accessToken = await jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      "secret_key",
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      success: true,
      message: "user logged in",
      accessToken,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldPassword, newPassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        sucess: false,
        message:"user is not found"
      })
    }

    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
      if (!checkOldPassword) {
        res.status(400).json({
          sucess: false,
          message: "the old password is wrong",
        });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);

    user.password = hashpassword;
    await user.save();

    res.status(200).json({
      success: true,
      message:"password update successfuly"
    })

    
    
  }
  catch (e) {
     res.status(500).json({
       success: false,
       message: "something went wrong",
     });
  }
}

module.exports = { registerUser, loginUser,changePassword };
