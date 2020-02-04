const express = require("express");
const requireLogin = require("./../../../middlewares/requireLogin");
const clearCache = require("./../../../middlewares/clearCache");

const router = express.Router();

const Blog = require("./model");

router.get("/", async (request, response) => {
  const blogs = await Blog.find();

  response.status(200).send({ data: blogs, total: blogs.length });
});

router.get("/:id", requireLogin, async (request, response) => {
  const blog = await Blog.findById(request.params.id).cache({
    key: request.params.id
  });

  response.status(200).send({ data: blog });
});

router.post("/", clearCache, async (request, response) => {
  const { title, content, user } = request.body;

  const newEntry = new Blog({
    title,
    content,
    createdAt: new Date(),
    _user: user.id,
  });

  try {
    await newEntry.save();
    response.status(200).send(newEntry);
  } catch (err) {
    response.status(400).send(err);
  }
});

router.patch("/:id", requireLogin, clearCache, async (request, response) => {
  const payload = request.body;

  delete payload._id;

  const updated = await Blog.updateOne({ _id: request.params.id }, payload);

  if (updated.nModified > 0) {
    response.status(200).send(updated);
  }

  response.status(200).send();
});

router.delete(
  "/:id",
  requireLogin,
  // clearCache, TODO: Need a seperate strategy for this case
  async (request, response) => {
    const removed = await Blog.deleteOne({
      _id: request.params.id
    });

    if (removed.deletedCount > 0) {
      response.status(200).send();
    }

    response.status(404).send();
  });

module.exports = router;
