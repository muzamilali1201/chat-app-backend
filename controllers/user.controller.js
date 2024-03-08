const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customError = require("../utils/error");

const userController = {
  userRegister: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      throw new customError(409, "Email already exists!");
    }
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
  },
  userLogin: async (req, res) => {
    const { email, password } = req.body;
    let userExist = await User.findOne({ email: email }).select("-password");
    if (!userExist) {
      throw new customError(404, "User doesn't exist");
    }
    const isValidPass = await bcrypt.compare(password, userExist.password);
    if (!isValidPass) {
      throw new customError(401, "Invalid Credentials");
    }
    const token = await jwt.sign(userExist, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    res.status(200).json({
      success: true,
      message: "User login successfully",
      token: token,
      data: userExist,
    });
  },
};

module.exports = { userController };
