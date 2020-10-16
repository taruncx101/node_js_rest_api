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
  const title = req.body.title;
    const content = req.body.content;
    console.log({title, content})
  res.status(201).json({
    message: "Post created successfully",
    post: { id: new Date().toISOString(), title, content },
  });
};
