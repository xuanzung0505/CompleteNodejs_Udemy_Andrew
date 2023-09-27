const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("index");
  // res.send("hehehe")
  res.json({
    name: "name",
  });
  next();
});

module.exports = router;
