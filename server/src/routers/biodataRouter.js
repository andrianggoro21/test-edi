const express = require("express");
const {
  createBiodataController,
  getBiodataController,
  updateBiodataController,
} = require("../controllers/biodataController");

const biodataRouter = express.Router();

biodataRouter.post("/:user_id", createBiodataController);
biodataRouter.get("/:user_id", getBiodataController);
biodataRouter.put("/:user_id", updateBiodataController);

module.exports = biodataRouter;
