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
    const { title, content } = req.body;
    const imagesUrls = req.files.map((file) => `http://localhost:5000/images/${file.filename}`);

    const post = new PostModel({
      title,
      content,
      imagesUrls,
    });

    post.save()
      .then(() => {
        res.json({ status: 'ok' });
      });
  }
}

module.exports = PostController;
