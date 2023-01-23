const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const { createJWT2, verifyToken2 } = require("./jwt2");
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createJWT2,
  verifyToken2,
};
