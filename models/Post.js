const { Schema, model } = require('mongoose');

const images = [{
  originalName: String,
  url: String,
  size: String,
  fileType: String,
}];

const videos = [{
  originalName: String,
  url: String,
  size: String,
  fileType: String,
  posterUrl: String,
}];

const date = {
  type: Date,
  default: Date,
};

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images,
  videos,
  comments: [{
    content: String,
    images,
    videos,
    date,
  }],
  date,
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
