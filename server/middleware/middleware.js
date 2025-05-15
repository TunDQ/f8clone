const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res, () =>{
        if ( req.user.role === "admin"){
            next();
        }else{
            res.status(403).json({ message: "Access denied: Admins only" })
        }
    })
}
module.exports = {verifyToken, verifyAdmin}