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

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnAuthorizeError(
        `Unauthorized to access this route`
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
