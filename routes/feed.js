const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const feedController = require('../controllers/feed')
const isAuth = require("../middleware/is-auth");

//GET /feed /posts
router.get("/posts", isAuth, feedController.getPosts);
router.get("/post/:postId",isAuth, feedController.getPost);
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  isAuth,
  feedController.createPost
);
router.put(
  "/post/:postId",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 15 }),
  ],
  isAuth,
  feedController.updatePost
);
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;