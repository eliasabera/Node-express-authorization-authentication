const jwt = require('jsonwebtoken');

const authMiddleWare = (req,res,next) => {
    const authheader = req.headers["authorization"];
    const token = authheader && authheader.split(' ')[1];

    if (!token) {
         res.status(500).json({
           success: false,
           message: "access denied",
         });
    }
    try {

        const decodetoken = jwt.verify(token, "secret_key");
        req.userInfo = decodetoken;
        console.log(decodetoken)  
        next()
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
}

module.exports=authMiddleWare