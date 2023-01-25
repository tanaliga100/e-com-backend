const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("Admin"), getAllOrders);

router.route("/showALlMyOrders").get(authenticateUser, getCurrentUserOrder);

router
  .route("/:id")
  .get(getSingleOrder)
  .patch(authenticateUser, authorizePermissions("Admin"), updateOrder);

module.exports = router;
