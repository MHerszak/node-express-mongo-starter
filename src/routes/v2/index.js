const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.send("posts V2");
});

router.get("/:id", (request, response) => {
  console.log("get by id: ", request.params.id);
  response.status(200).send(request.body)
});

router.post("/", (request, response) => {
  console.log(response.status);
  // response.send(request.body);
  response.status(200).send(body)
});

module.exports = router;
