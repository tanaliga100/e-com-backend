const jwt = require("jsonwebtoken");

const createJWT2 = ({ payload }) => {
  const token = jwt.sign(payload, "jwtSecret", { expiresIn: "1d" });
  return token;
};

const verifyToken2 = ({ token }) => {
  return jwt.verify(token, "jwtSecret");
};

module.exports = {
  createJWT2,
  verifyToken2,
};
