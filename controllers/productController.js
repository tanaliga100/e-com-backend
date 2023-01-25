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
  const products = await Product.find({}).populate({
    path: "user",
    select: "name email",
  });
  res
    .status(StatusCodes.OK)
    .json({ count: products.length, msg: "All Products", products });
};

const getSingleProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findOne({ _id: prodId }).populate("reviews");
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
    throw new CustomError.BadRequestError(`No file uploaded...`);
  }
  const prodImage = req.files.image;
  if (!prodImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError(`Image only is required`);
  }
  const maxSize = 1080 * 1080;
  if (prodImage.size > req.maxSize) {
    throw new CustomError.BadRequestError(
      `Please Upload image size lower than ${maxSize}MB`
    );
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${prodImage.name}`
  );
  await prodImage.mv(imagePath);
  res.status(StatusCodes.OK).json({
    msg: "Successfully Uploaded",
    image: `./uploads/${prodImage.name}`,
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
