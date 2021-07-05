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

  TopicModel.find().select('topic').sort('-created').exec((err, topics) => {
    if (err) return handleError(err);
    res.render('topics', {
      currentURL: '/topics',
      topics: topics
    })
  });
});

// Show new topic form
router.get('/new-topic', function (req, res, next) {
  res.render('new-topic', {
    currentURL: "/new-topic"
  })
})

// Create new topics with data from form
router.post('/new-topic', function (req, res, next) {
  var topic = req.body.topic;
  // Create a new topic with TopicModel
  TopicModel.create({
    topic: topic
  }, (err, instance) => {
    if (err) return handleError(err);
    console.log('Topic created successfully')
  })
  res.redirect('/topics');
});

module.exports = router;