const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: String,
  pwd: String,
  posts: {type: Number, default: 0},
  isAdmin: {type:Boolean, default: false},
  comments: [{body: String, post: Number}]
},
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
