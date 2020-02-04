const express = require("express");
const router = express.Router();

router.use("/actions", require("./actions/actions"));
router.use("/posts", require("./posts/posts"));

module.exports = router;
