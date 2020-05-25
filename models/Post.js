const { Schema, model } = require('mongoose');

const date = {
  type: Date,
  default: Date,
};

const title = {
  type: String,
  required: true,
};

const content = {
  type: String,
  required: true,
};

const attachedFiles = [{
  originalName: String,
  url: String,
  size: String,
  width: Number,
  height: Number,
  fileType: String,
  posterUrl: String,
}];

const comments = [{
  id: String,
  attachedFiles,
  content: String,
  commentsIdsToReplay: {
    type: [String],
    default: [],
  },
  replyingCommentsIds: {
    type: [String],
    default: [],
  },
  date,
}];

const commentsIdsToReplay = {
  type: [String],
  default: [],
};

const postSchema = new Schema({
  id: String,
  date,
  title,
  content,
  comments,
  attachedFiles,
  commentsIdsToReplay,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
