const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Product Created", product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ count: products.length, msg: "All Products", products });
};

const getSingleProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findOne({ _id: prodId });
  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${prodId}`);
  }
  res.status(StatusCodes.OK).json({
    msg: "Here is the product " + product.name.toUpperCase(),
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: prodId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${prodId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Product updated  with id of" + prodId, product });
};

const deleteProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findOne({ _id: prodId });
  if (!product) {
    throw new CustomError.NotFoundError(`No Product with id : ${prodId}`);
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "Product Deleted Successfully" });
};

const uploadImage = async (req, res) => {
  console.log(req.files);
  if (!req.files) res.send("Product Uploaded");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
