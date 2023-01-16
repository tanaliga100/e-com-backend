// IMPORT PACKAGE
const express = require("express");
const connectDB = require("./db/connect");
// PACKAGE INSTANCE
const app = express();
require("dotenv").config();
// TOP MIDDLEWARES

// BOTTOM MIDDLEWARES

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
