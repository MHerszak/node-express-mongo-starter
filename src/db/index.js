const mongoose = require("mongoose");
const config = require("./../config/keys");

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", () => {
  console.error.bind(console, "MongoDB connection error:");
});

mongoose.connection.once("open", () => {
  console.log("connected to DB....");
});