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
    content: String,
    images: attachedFile,
    videos: attachedFile,
    date,
  }],
  date,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
