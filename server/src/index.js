const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 8080;

const app = new express();
app.use(bodyParser.json());
app.use(cors());

const mainRouter = require("./routers/mainRouter");
app.use("/api", mainRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})