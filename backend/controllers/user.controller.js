const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

// Middleware for cookie parsing (ensure you use this in your app)
const cookieParser = require("cookie-parser");

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    const user = await userService.createUser({
      firstname: fullname.firstname, // Ensure fullname has correct structure
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    // middleware call
    res.status(200).json(req.user);
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    await blackListTokenModel.create({ token });

    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};
