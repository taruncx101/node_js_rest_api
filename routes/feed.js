const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const feedController = require('../controllers/feed')

//GET /feed /posts
router.get("/posts", feedController.getPosts);
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);


module.exports = router;