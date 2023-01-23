const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const { attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  // first user registered as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "Admin" : "User";
  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.CREATED)
    .json({ user: tokenUser, status: "User Registered" });
};

const login = async (req, res) => {
  // login route
  // check if has email and password : return 400
  // find user : return 400
  // check password if match else return no match
  // if everything correct, atatch cookies
  // and send back the same response
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(`Please provide email and password`);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError(`Invalid credentials`);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError(`Invalid Password`);
  }
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, status: "Login Successful" });
};

const logout = async (req, res) => {
  // set token cookie equal to some string
  // set expriration to date.now
  res.cookie("tokenInCookies", "logout", {
    httpOnly: true,
    expires: Date.now(),
  });
  res.status(StatusCodes.OK).json({ status: "User Logged Out" });
};

module.exports = { register, login, logout };
