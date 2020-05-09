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

    const files = req.files.map(file => ({
      originalName: file.originalname,
      url: `${SERVER_URL}attached/files/${file.filename}`,
      size: file.size,
      fileType: file.mimetype.match(/image/) ? 'image' : 'video',
    }));

    const images = files.filter(file => file.fileType === 'image');
    const videos = files.filter(file => file.fileType === 'video');

    PostModel.findOne({ _id: req.params.id })
      .then(post => {
        const comments = post.comments;
        comments.push({
          content: newComment,
          images,
          videos,
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

    const files = req.files.map(file => ({
      originalName: file.originalname,
      url: `${SERVER_URL}attached/files/${file.filename}`,
      size: file.size,
      fileType: file.mimetype.match(/image/) ? 'image' : 'video',
    }));

    const images = files.filter(file => file.fileType === 'image');
    const videos = files.filter(file => file.fileType === 'video');

    const post = new PostModel({
      title,
      content,
      images,
      videos,
    });

    post.save()
      .then(() => {
        res.json({ status: 'ok' });
      });
  }
}

module.exports = PostController;
