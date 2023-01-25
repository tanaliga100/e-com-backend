const Review = require("../models/Review");
const Product = require("../models/Product");
const CustomError = require("../errors/index");
const { checkPermissions } = require("../utils");
const { StatusCodes } = require("http-status-codes");

// CREATE CONTROLLER
const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No Product with Id: ${productId}`);
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      `Already submitted a review for this product`
    );
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

// GET ALL CONTROLLER
const getAllReviews = async (req, res) => {
  const review = await Review.find({})
    .populate({
      path: "product",
      select: "name company price category",
    })
    .populate({
      path: "user",
      select: "name",
    });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Lists of all the reviews", length: review.length, review });
};
// GET SINGLE REVIEW CONTROLLER
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId }).populate({
    path: "user",
    select: "name email role",
  });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with Id: ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: updateId } = req.params;
  const { title, rating, comment } = req.body;
  const review = await Review.findOne({ _id: updateId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with Id: ${updateId}`);
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ msg: "Review Updated", review });
};
// DELETE REVIEW CONTROLLER
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with Id: ${reviewId}`);
  }
  checkPermissions(req.user, review.user);
  await review.remove();

  res.status(StatusCodes.OK).json({ msg: "Review removed" });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
