const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// db
const Reqs = require('../../../database-mongodb/Request.js');



router.get('/all/', function(req, res){
  Reqs.find( {}, function(err, posts){
    if (err) {
      console.log('erroe getting featured ', err)
    }
    res.json(posts)
  })
})

router.post('/new/', function(req, res) {
  let newReq = req.body
  const request = new Reqs(newReq)
  request.save(function(err){
    if (err) {
    console.log('save error ', err)
    }
  })
  res.json(newReq)
})


module.exports = router