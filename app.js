// IMPORT PACKAGE
const express = require("express");
const connectDB = require("./db/connect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
// IMPORTS
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productsRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// const authRouter2 = require("./routes/authRoutes2");
// PACKAGE INSTANCE
const app = express();
require("dotenv").config();
require("express-async-errors");
// TOP MIDDLEWARES
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

// ROUTES
app.get("/api/v1", (req, res) => {
  console.log("reqCookies", req.signedCookies);
  res.send("e commerce-api");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/products", reviewRouter);

// BOTTOM MIDDLEWARES
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to DB !!`);
    });
  } catch (error) {
    console.log(console.log(error));
  }
};

start();
