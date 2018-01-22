const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//moment
const moment = require('moment')

// db
const Blogs = require('../../../database-mongodb/Blog.js');

router.delete('/delete/:id', function(req, res) {
  Blogs.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('error in delete ', err)
    }
  })
})

router.patch('/featured/:id', function(req, res){
  let query = {_id: req.params.id}
  Blogs.update(query, {featured: true}, function(err, user){
    if (err) {
      console.log('error updating')
    }
  })
    res.end('updated to featur')
})

router.get('/featured/', function(req, res){
  Blogs.find({featured: true}, function(err, posts){
    if (err) {
      console.log('erroe getting featured ', err)
    }
    res.json(posts.filter( function(post){
      if (post.featured) {
        return post
      }
    }))
  })
})

router.get('/byauthor/:name', function(req, res){
  let name = req.params.name
  Blogs.find({author: name}, function(err, posts){
    if (err) {
      console.log('error getting by author ', err)
    }
    res.json(posts)
  })
})

router.get('/bytitle/:title', function(req, res){
  let title = req.params.title
  Blogs.find({title: title}, function(err, posts){
    if (err) {
      console.log('error getting by title ', err)
    }
    res.json(posts)
  })
})

router.get('/one/:id', function(req, res) {
   let query = req.params.id
   let dateFormatted = {}
   Blogs.findOne({ _id: query}, function( err, post) {
    if (err) {
      console.log('error finding one ', err)
    }
    post.prettyDate = moment(post.createdAt).fromNow()

    res.send(moment(post.createdAt).fromNow())
   })
})


router.get('/all/', function(req, res) {
  // TODO - your code here!
  Blogs.find(function( err, posts) {
    if (err) {
      console.log(err)
    }
    let formattedPosts = []
     posts.forEach( function(post) {
      let newPost = {}
      for (let key in post){
        newPost[key] = post[key]
      }
      newPost.createdAt = moment(post.createdAt).fromNow();
      formattedPosts.push(newPost)
    })
    res.json(formattedPosts)
  })
});

router.get('/custom/:query', function(req,res) {
  Blogs.find(query, function(err, posts){
    if (err) {
      console.log('custom search error', err)
    }
    res.json(posts)
  })
})

router.get('/dates/', function(req, res) {
  Blogs.find(function( err, posts) {
    if (err) {
      console.log(err)
    }
    let dates = []
    posts.forEach( function(post) {

      dates.push({date: moment(post.createdAt).fromNow()})
    })
    res.json(dates)
  })
});

router.patch('/one/:id', function(req, res) {
  let query = {_id: req.params.id}

  Blogs.update(query, { $inc: {views: 1} } , function(err, post) {
    if (err) {
      console.log(err)
    }

    res.json(post)
  })
})

router.post('/new/', function(req, res) {
  let newPost = req.body
  console.log('new post obj ', newPost)
  const post = new Blogs(newPost)
  post.save(function(err){
    if (err) {
    console.log('save error ', err)
    }
  })
  res.json(newPost)
})


module.exports = router