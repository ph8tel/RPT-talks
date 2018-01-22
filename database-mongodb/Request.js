const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const requestSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
},
  {
    timestamps: true
  }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
