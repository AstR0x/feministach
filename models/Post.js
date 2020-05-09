const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [{
    originalName: String,
    url: String,
    size: String,
    fileType: String,
  }],
  videos: [{
    originalName: String,
    url: String,
    size: String,
    fileType: String,
  }],
  comments: [{
    content: String,
    images: [{
      originalName: String,
      url: String,
      size: String,
      fileType: String,
    }],
    videos: [{
      originalName: String,
      url: String,
      size: String,
      fileType: String,
    }],
    date: {
      type: Date,
      default: Date,
    },
  }],
  date: {
    type: Date,
    default: Date,
  },
});

const PostModel = model('Post', postSchema);

module.exports = PostModel;
