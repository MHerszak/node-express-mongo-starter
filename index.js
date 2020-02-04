const express = require("express");

// Start database
require("./src/db/index");

// Services
require("./src/services/cache");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.use("/api", require("./src/api"));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});