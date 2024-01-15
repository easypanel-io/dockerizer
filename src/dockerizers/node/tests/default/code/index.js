const express = require("express");
const app = express();
const router = express.Router();

const port = 3000;

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.send("Hello dockerized");
});

app.use("/", router);

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
