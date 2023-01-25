const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} = require("../utils");

//  GET ALL USERS
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "User" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

// GET SINGLE USER
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id ${userId}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

// SHOW CURRENT USER
const showCurrentUser = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ user: req.user, msg: `User is : ${req.user.name.toUpperCase()}` });
};

// UPDATE USER CREDENTIALS

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   console.log("req", req.body);
//   if (!req.body.email || !req.body.name) {
//     throw new CustomError.BadRequestError(
//       "Email or Name is missing.. provide both values"
//     );
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email: req.body.email, name: req.body.name },
//     { new: true, runValidators: true }
//   );

//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res
//     .status(StatusCodes.OK)
//     .json({ user: tokenUser, msg: "User Credentials Updated" });
// };

// update with pre hook
const updateUser = async (req, res) => {
  if (!req.body.email || !req.body.name) {
    throw new CustomError.BadRequestError(
      "Email or Name is missing.. provide both values"
    );
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = req.body.email;
  user.name = req.body.name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser, msg: "User Credentials Updated" });
};

// UPDATE USER PASSWORD
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(`Please provide both values`);
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError(
      "Password didnt not match to old"
    );
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success ! Password Updated" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserPassword,
  updateUser,
};
