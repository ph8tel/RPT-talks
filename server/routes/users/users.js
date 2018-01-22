const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');

//moment
const moment = require('moment')
// db
const Users = require('../../../database-mongodb/User.js');
// orm
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/login/:name', function(req, res) {
  console.log(req.params, ' is name')

  Users.findOne({name: req.params.name}, function (err, user) {
    if (err) {
      console.log('user get error ', err)
    }
    res.json(user)
  })
})

router.get('/one/:id', function(req, res) {
  let query = re.params.id;
  Users.findOne({_id: query}, function (err, user) {
    if (err) {
      console.log('user get error ', err)
    }
    res.json(user)
  })
})

router.get('/all/', function(req, res) {
  Users.find( function (err, users) {
    if (err) {
      console.log('user get error ', err)
    }
    res.json(users)
  })
})

router.post('/new/', function(req, res) {
  let newUser = req.body
  console.log('new user obj ', newUser)
  const user = new Users(newUser)
  user.save(function(err){
    if (err) {
    console.log('save error ', err)
    }
  })
  res.json(newUser)
})

router.patch('/one/:id', function(req, res){
  let query = {_id: req.params.id}
  Users.update(query, {isAdmin: true}, function(err, user){
    if (err) {
      console.log('error updating')
    }
  })
    res.end('updated')
})

router.delete('/one/:id', function(req, res){
  let query = {_id: req.params.id}
  Users.remove(query, function (err) {
    if (err){
      console.log('delete user failed ', err)
    }
  })
})

module.exports = router