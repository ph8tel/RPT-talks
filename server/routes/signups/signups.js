const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// db
const Signups = require('../../../database-mongodb/Signups.js');



router.get('/all/', function(req, res){
  Signups.find( {}, function(err, posts){
    if (err) {
      console.log(err)
    }
    res.json(posts)
  })
})

router.post('/new/', function(req, res) {
  let newReq = req.body
  const signup = new Signups(newReq)
  signup.save(function(err){
    if (err) {
    console.log('save error ', err)
    }
  })
  res.json(newReq)
})


module.exports = router