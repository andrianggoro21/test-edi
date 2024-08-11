const express = require("express");
const userRouter = require("./userRouter");
const biodataRouter = require("./biodataRouter");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/biodata", biodataRouter);

module.exports = mainRouter