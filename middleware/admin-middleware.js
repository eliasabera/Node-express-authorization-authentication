

const isAdmin = (req, res, next)=>{
    if (req.userInfo.role !== "admin") {
      return res.status(401).json({
        message: "admin credential require",
      });
    }
    next()
}

module.exports = isAdmin;