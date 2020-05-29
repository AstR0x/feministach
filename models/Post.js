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

const repliesIds = {
  type: [String],
  default: [],
};

const comments = [{
  id: String,
  attachedFiles,
  content: String,
  fromRepliesIds: repliesIds,
  toRepliesIds: repliesIds,
  date,
}];

const postSchema = new Schema({
  id: String,
  date,
  title,
  content,
  comments,
  attachedFiles,
  toRepliesIds: repliesIds,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
