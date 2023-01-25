const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getSingleProductReview } = require("../controllers/reviewController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("Admin")], createProduct)
  .get(getAllProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("Admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("Admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("Admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReview);

module.exports = router;
