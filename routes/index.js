var express = require('express');
var router = express.Router();
var TopicModel = require('../models/topics')

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    currentURL: '/'
  });
});

// Show all topics
router.get('/topics', function (req, res, next) {

  var topics = TopicModel.find();
  res.render('topics', {
    currentURL: '/topics'
  })
});


router.get('/new-topic', function (req, res, next) {
  res.render('new-topic', {
    currentURL: "/new-topic"
  })
})

router.post('/new-topic', function (req, res, next) {
  res.send('Got a POST request');
});

module.exports = router;