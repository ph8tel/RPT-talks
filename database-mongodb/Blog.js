const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;



const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  videoUrl: String,
  videoUrlFormatted: String,
  videoId: String,
  body: String,
  views: {type: Number, default: 0},
  featured: {type: Boolean, feault: false}
},
  {
    timestamps: true
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
