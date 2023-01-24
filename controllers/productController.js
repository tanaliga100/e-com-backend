const createProduct = async (req, res) => {
  res.send("Create Product");
};

const getAllProducts = async (req, res) => {
  res.send("All Products");
};

const getSingleProduct = async (req, res) => {
  res.send("Get Single Product");
};

const updateProduct = async (req, res) => {
  res.send("Update Product");
};

const deleteProduct = async (req, res) => {
  res.send("Delete Product");
};

const uploadImage = async (req, res) => {
  res.send("Product Uploaded");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
