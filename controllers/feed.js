const { validationResult } = require('express-validator/check');
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
exports.postPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Vaalidation failed, entered stts is incorrect',
      errors: errors.array(),
    })
  }
  const title = req.body.title;
    const content = req.body.content;
    console.log({title, content})
  res.status(201).json({
    message: "Post created successfully",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      imageUrl: "images/ace.jpg",
      creator: {
        name: "Tarun",
      },
      createdAt: new Date(),
    },
  });
};
