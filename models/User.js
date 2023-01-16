const { string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxLength: 30,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valida email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minLength: 6,
  },
  roles: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});
module.exports = mongoose.model("User", UserSchema);
