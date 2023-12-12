const jwt = require("jsonwebtoken")
const {jwtSecretKey} = require("../config/configKeys")

exports.auth = (req, res, next) => {
    const token = req.headers["shiksha-niyojak"]
    if(!token){
        return res
      .status(401)
      .json({ jwt_error: "No token, authorization denied" });
    }
    try{
        const decoded = jwt.verify(token, jwtSecretKey)
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userName = decoded.name;
        req.email = decoded.email;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({jwt_error: "Token is invalid"})
    }
}