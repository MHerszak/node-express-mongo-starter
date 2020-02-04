const express = require("express");
const cookieSession = require("cookie-session");
const router = express.Router();
const bodyParser = require("body-parser")

const keys = require("./../config/keys");

router.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.use("/v1", require("./../routes/v1"));
router.use("/v2", require("./../routes/v2"));

module.exports = router;