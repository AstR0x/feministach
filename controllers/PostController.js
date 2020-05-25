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
      const post = await PostModel.findOne({ id: req.params.id });

      await res.json(post);
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при поиске поста');
      console.error(e);

      await res.status(500).send({ error: 'Произошла ошибка при поиске поста' });
    }
  }

  async update(req, res) {
    try {
      const { newComment, commentsIdsToReplay } = req.body;

      const attachedFiles = await getAttachedFilesInfo(req.files);

      const post = await PostModel.findOne({ id: req.params.id });

      const id = Date.now();

      post.comments.push({
        id,
        attachedFiles,
        commentsIdsToReplay,
        content: newComment,
      });

      if (commentsIdsToReplay) {
        if (Array.isArray(commentsIdsToReplay)) {
          commentsIdsToReplay.forEach(toReplayId => {
            const index = post.comments.findIndex(comment => comment.id === toReplayId);
            post.comments[index].replyingCommentsIds.push(id);
          });
        } else {
          const index = post.comments.findIndex(comment => comment.id === commentsIdsToReplay);
          post.comments[index].replyingCommentsIds.push(id);
        }
      }

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

      const attachedFiles = await getAttachedFilesInfo(req.files);

      const id = Date.now();

      const post = new PostModel({
        id,
        title,
        content,
        attachedFiles,
      });

      const createdPost = await post.save();

      res.send({ postURL: `/opened/post/${createdPost.id}` });
    } catch (e) {
      console.error('\nERROR: Произошла ошибка при создании поста');
      console.error(e);

      res.status(500).send({ error: 'Произошла ошибка при создании поста' });
    }
  }
}

module.exports = PostController;
