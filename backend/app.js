const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// TODO Bu silinecek
logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((e) => logger.error(`Error connecting to MongoDB: ${e.message}`));

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

module.exports = app;
