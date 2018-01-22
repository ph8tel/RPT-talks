const express = require('express');
const bodyParser = require('body-parser');

const Blogs = require('../database-mongodb/Blog.js');
const Users = require('../database-mongodb/User.js');

const app = express();
const PORT = process.env.PORT || 3000


const blogs = require('./routes/blogs/blogs')
const users = require('./routes/users/users')
const requests = require('./routes/requests/requests')
//moment
const moment = require('moment')
// routes
app.use('/api/blogs', blogs)
app.use('/api/users', users)
app.use('/api/requests', requests)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

// date route
app.get ('/api/date/:raw', function(req, res) {
  let rawDate = req.body.raw
  res.json({date: moment(rawDate).fromNow()})
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

