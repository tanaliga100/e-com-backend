const CustomError = require("../errors/index");
const { isTokenValid } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.tokenInCookies;
  if (!token) {
    throw new CustomError.UnauthenticatedError(`Authenctication Invalid`);
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = {
      name,
      userId,
      role,
    };
    next();
  } catch (e) {
    throw new CustomError.UnauthenticatedError(
      `Authenctication Invalid in catch`
    );
  }
};

const authorizePermissions = async (req, res, next) => {
  console.log("admin route");
  next();
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
