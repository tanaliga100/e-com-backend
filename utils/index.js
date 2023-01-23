const { createJWT, isTokenValid } = require("./jwt");
const { createJWT2, verifyToken2 } = require("./jwt2");
module.exports = {
  createJWT,
  isTokenValid,
  createJWT2,
  verifyToken2,
};
