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
  imageURL: {
    type: String,
  },
  comments: [{
    content: String,
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
