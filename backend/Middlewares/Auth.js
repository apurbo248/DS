const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.cookie_secret);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user)

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401);
   // throw new Error("Not authorized, no token");
    res.status(401).json({ message: "Not authorized, login first"});
  }
};

module.exports = protect;
