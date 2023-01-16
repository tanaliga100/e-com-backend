// IMPORT PACKAGE
const express = require("express");
const connectDB = require("./db/connect");
const morgan = require("morgan");
// IMPORTS
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authRouter = require("./routes/authRoutes");
// PACKAGE INSTANCE
const app = express();
require("dotenv").config();
require("express-async-errors");
// TOP MIDDLEWARES
app.use(express.json());
app.use(morgan("tiny"));
// ROUTES
app.get("/", (req, res) => {
  res.send("e commerce-api");
});
app.use("/api/v1/auth", authRouter);
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
