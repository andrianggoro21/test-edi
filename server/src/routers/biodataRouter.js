const express = require("express");
const {
  createBiodataController,
  getBiodataController,
  updateBiodataController,
} = require("../controllers/biodataController");

const biodataRouter = express.Router();

biodataRouter.post("/", createBiodataController);
biodataRouter.get("/:user_id", getBiodataController);
biodataRouter.patch("/:user_id", updateBiodataController);

module.exports = biodataRouter;
