const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../../configs/auth");

const authenticate = async  (req, res, next) =>{
  const authHeader = req.headers.authorization;
  
  if(!authHeader){
    return res.status(401).json({error: "Token não existe."});
  }

  const  [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    
    return next();
  } catch (error) {
    return res.status(401).json({error: "Token inválido."});
  }
}

module.exports = authenticate;