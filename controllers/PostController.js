const config = require('config');
const PostModel = require('../models/Post');

const SERVER_URL = config.get('SERVER_URL');

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
      .then(post => {
        if (!post) {
          res.send({ error: 'Not found' });
        } else {
          res.json(post);
        }
      });
  }

  update(req, res) {
    const { newComment } = req.body;

    const images = req.files.map(file => ({
      originalName: file.originalname,
      url: `${SERVER_URL}images/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    }));

    PostModel.findOne({ _id: req.params.id })
      .then(post => {
        const comments = post.comments;
        comments.push({
          content: newComment,
          images,
        });

        PostModel.findByIdAndUpdate(req.params.id, { $set: { comments } }, err => {
          if (err) {
            res.send(err);
          }

          res.json({ status: 'updated' });
        });
      });
  }

  create(req, res) {
    const { title, content } = req.body;

    const images = req.files.map(file => ({
      originalName: file.originalname,
      url: `${SERVER_URL}images/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    }));

    const post = new PostModel({
      title,
      content,
      images,
    });

    post.save()
      .then(() => {
        res.json({ status: 'ok' });
      });
  }
}

module.exports = PostController;
