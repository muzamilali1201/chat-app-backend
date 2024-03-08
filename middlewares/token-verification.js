const User = require("../models/User");
const customError = require("../utils/error");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    throw new customError(403, "User is not login or auth header didn't set!");
  }
  token = token.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!decodedToken) throw new customError(403, "Token couldn't verified!");
  const user = await User.findOne({ _id: response._id }).select("-password");
  if (user) {
    req.userData = decodedToken;
    next();
    return;
  }
};

module.exports = verifyToken;
