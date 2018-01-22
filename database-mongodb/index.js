const mongoose = require('mongoose');
const mongoUri = 'mongodb://herokuClient:99HackReactor$$@ds111648.mlab.com:11648/community-talks';

const db = mongoose.connect(mongoUri);

module.exports = db;
