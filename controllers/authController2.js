const User = require("../models/User2");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createJWT2 } = require("../utils/jwt2");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  // first registered user should be an ADMIN
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "Admin" : "User";

  const user = await User.create({ name, email, password, role });
  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  const token = createJWT2({ payload: tokenUser });
  const oneDay = 1000 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const loginUser = async (req, res) => {
  res.send("Login Controller2");
};
const logoutUser = async (req, res) => {
  res.send("Logout Controller2");
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
