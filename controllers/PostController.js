const PostModel = require('../models/Post');

class PostController {
  index(req, res) {
    PostModel.find()
      .then((posts, err) => {
        if (err) {
          res.send(err);
        }

        res.json(posts);
      });
  }

  read(req, res) {
    PostModel.findOne({ _id: req.params.id })
      .then((post) => {
        if (!post) {
          res.send({ error: 'not found' });
        } else {
          res.json(post);
        }
      });
  }

  update(req, res) {
    PostModel.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
      if (err) {
        res.send(err);
      }

      res.json({ status: 'updated' });
    });
  }

  create(req, res) {
    const data = req.body;

    const post = new PostModel({
      title: data.title,
      content: data.content,
      imageURL: data.imageURL,
    });

    post.save()
      .then(() => {
        res.json({ status: 'ok' });
      });
  }
}

module.exports = PostController;
