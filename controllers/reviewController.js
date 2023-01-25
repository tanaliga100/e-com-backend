const createReview = async (req, res) => {
  res.send("Create Review");
};
const getAllReviews = async (req, res) => {
  res.send("All Reviews");
};

const getSingleReview = async (req, res) => {
  res.send("Single Review");
};

const updateReview = async (req, res) => {
  res.send("Update Reviews");
};

const deleteReview = async (req, res) => {
  res.send("Deletet Review");
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
