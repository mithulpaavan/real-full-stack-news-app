const jwt = require('jsonwebtoken');

exports.validate = async (req, res, next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({success: false, message: "401 unauthorised"});
        }

        const userinfo = jwt.verify(token, process.env.JWT_SECRET);
        req.user = userinfo;
        console.log(userinfo);
        console.log("validation confirmed")
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({success: false, message: "some unauthorized token"});
    }
}