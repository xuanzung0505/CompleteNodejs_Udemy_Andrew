const express = require("express");
const router = require("./router");
const path = require("path");
const app = express();

app.use("/api", router);
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
