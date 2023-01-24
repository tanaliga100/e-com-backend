const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

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
  if (!req.files) {
    throw new CustomError.BadRequestError(`No File Upload`);
  }
  const prodImage = req.files.image;
  console.log(prodImage);

  if (!prodImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const maxSize = 1080 * 1080;
  if (prodImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      `Please Upload image size lower than ${maxSize}MB`
    );
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads." + `${prodImage.name}`
  );
  await prodImage.mv(imagePath);
  res.status(StatusCodes.OK).json({
    msg: "Image Uploaded Successfully",
    image: `/uploads/${prodImage.name}`,
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
