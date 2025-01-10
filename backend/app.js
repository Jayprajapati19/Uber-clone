const dtoenv = require("dotenv");
dtoenv.config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

module.exports = app;
