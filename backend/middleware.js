const jwt=require("jsonwebtoken");
const JWT_SECRET=require("./config");

const outMiddleware=(req,res,next)=>{
  const authHeader=req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(403).json({message: 'Access forbidden: Invalid token'});
  }
  const token=authHeader.split(' ')[1];
  try{
    const decoded=jwt.verify(token,JWT_SECRET);
    req.userId=decoded.userId;
    next();
  }catch(err){
    return res.status(403).json({message: 'Invalid token'});
  }
};

module.exports={outMiddleware};