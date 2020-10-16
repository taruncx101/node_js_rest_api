const { validationResult } = require('express-validator/check');
const Post = require('../models/post')
exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/ace.jpg',
            creator: {
                name: 'Tarun'
            },
            createdAt: new Date(),
        }],
        totaltems: 1
    });
}
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Vaalidation failed, entered stts is incorrect',
      errors: errors.array(),
    })
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title,
    content,
    imageUrl: "images/ace.jpg",
    creator: {
      name: "Tarun",
    },
  });
  post.save()
    .then(result => {
      console.log(result);
        res.status(201).json({
          message: "Post created successfully",
          post: result,
        });
    })
    .catch(err => {
    console.log(err);
  })

};
