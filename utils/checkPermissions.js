const CustomError = require("../errors/index");

const checkPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser);
  console.log(resourceUserId);
  console.log(typeof resourceUserId);
  if (requestUser.role === "Admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnAuthorizeError(
    "Not authorized to access this resource"
  );
};

module.exports = checkPermissions;
