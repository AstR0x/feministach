const getAttachedFilesInfo = require('../utils/getAttachedFilesInfo');
const PostModel = require('../models/Post');

class PostController {
  async index(req, res) {
    try {
      const posts = await PostModel.find();
      await res.json(posts);
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при поиске постов');
      console.error(e);
      await res.status(500).send({ error: 'Произошла ошибка при поиске постов' });
    }
  }

  async read(req, res) {
    try {
      const post = await PostModel.findOne({ _id: req.params.id });

      await res.json(post);
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при поиске поста');
      console.error(e);

      await res.status(500).send({ error: 'Произошла ошибка при поиске поста' });
    }
  }

  async update(req, res) {
    try {
      const { newComment } = req.body;

      const { images, videos } = getAttachedFilesInfo(req.files);

      const post = await PostModel.findOne({ _id: req.params.id });

      post.comments.push({ content: newComment, images, videos });

      await post.save();

      await res.json({ status: 'updated' });
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при добавлении комментария');
      console.error(e);

      await res.status(500).send({ error: 'Произошла ошибка при добавлении комментария' });
    }
  }

  async create(req, res) {
    try {
      const { title, content } = req.body;

      const { images, videos } = getAttachedFilesInfo(req.files);

      const post = new PostModel({
        title,
        content,
        images,
        videos,
      });

      const createdPost = await post.save();

      res.send({ postURL: `/opened/post/${createdPost._id}` });
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при создании поста');
      console.error(e);

      res.status(500).send({ error: 'Произошла ошибка при создании поста' });
    }
  }
}

module.exports = PostController;
