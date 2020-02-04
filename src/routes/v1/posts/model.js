const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  _user: String
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;