const createOrder = async (req, res) => {
  res.send("Create Order");
};
const getAllOrders = async (req, res) => {
  res.send("All Orders");
};
const getCurrentUserOrder = async (req, res) => {
  res.send("Get Current Order");
};
const getSingleOrder = async (req, res) => {
  res.send("Single Order");
};
const updateOrder = async (req, res) => {
  res.send("Update Order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrder,
  updateOrder,
};
