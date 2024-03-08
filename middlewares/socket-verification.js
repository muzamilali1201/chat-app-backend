// const { head } = require("../routes/user.routes");
const jwt = require("jsonwebtoken");
const customError = require("../utils/error");

const socketVerification = async (socket, next) => {
  try {
    let token = socket.handshake.headers.authorization;
    if (!token) {
      throw Error("User unauthorized!");
    }
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      throw new customError(401, "User unauthorized");
    }
    socket.userData = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = socketVerification;
