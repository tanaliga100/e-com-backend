// IMPORT PACKAGE
const express = require("express");

// PACKAGE INSTANCE
const app = express();

// TOP MIDDLEWARES

// BOTTOM MIDDLEWARES

// SERVER INSTANCE
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started at ${port} and connected to DB !!`);
    });
  } catch (error) {
    console.log(console.log(error));
  }
};

start();
