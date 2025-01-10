const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  }

  const { firstname, lastname, email, password } = req.body;

  const hashedPassword = await userModel.hashedPassword(password);

  const user = await userService.creareUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};
