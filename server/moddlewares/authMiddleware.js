const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{

    let token;
    let authHeader  = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message : "No Token, Permission denied."})
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECREAT);
            req.user = decode;
            console.log("the decode user is ", req.user);
            next()
        } catch (error) {
            res.status(400).json({message: "Token is not valid"});
        }
    }
    else{
        return res.status(401).json({message : "No Token, Permission denied."})
    }

}

module.exports = verifyToken;