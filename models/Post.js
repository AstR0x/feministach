const { Schema, model } = require('mongoose');

const date = {
  type: Date,
  default: Date,
};

const attachedFile = [{
  originalName: String,
  url: String,
  size: String,
  width: Number,
  height: Number,
  fileType: String,
  posterUrl: String,
}];

const postSchema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: attachedFile,
  videos: attachedFile,
  comments: [{
    id: String,
    content: String,
    images: attachedFile,
    videos: attachedFile,
    commentsIdsToReplay: {
      type: [String],
      default: [],
    },
    replyingCommentsIds: {
      type: [String],
      default: [],
    },
    date,
  }],
  commentsIdsToReplay: {
    type: [String],
    default: [],
  },
  date,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
