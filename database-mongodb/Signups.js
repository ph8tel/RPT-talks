const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const signupSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  when: String
},
  {
    timestamps: true
  }
);

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
