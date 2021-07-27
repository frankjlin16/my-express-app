var express = require('express');
var router = express.Router();

// Import models
var TopicModel = require('../models/topics')
var EntryModel = require('../models/entries')

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    currentURL: '/'
  });
});

// Show all topics
router.get('/topics', function (req, res, next) {

  TopicModel.find().select('topic').sort('topic').exec((err, topics) => {
    if (err) return handleError(err);
    res.render('topics', {
      currentURL: '/topics',
      topics: topics
    })
  });
});

// Show particular topic
router.get('/topics/:topic', async function (req, res, next) {

  var topic = await TopicModel.findOne({
    topic: req.params.topic
  }).exec();

  EntryModel.find({topic: topic}).populate('topic').sort('-dateCreated').exec((err, entries) => {
    if (err) return handleError(err);
    res.render('topic', {
      topic: req.params.topic,
      entries: entries
    });
  })
})

// Show new topic form
router.get('/new-topic', function (req, res, next) {
  res.render('new-topic')
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

// Show new entry form
router.get('/new-entry', function (req, res) {
  TopicModel.find().select('topic').sort('topic').exec((err, topics) => {
    if (err) return handleError(err);
    res.render('new-entry', {
      currentURL: '/new-entry',
      topics: topics
    })
  });
});

// Create new entry with data from form
router.post('/new-entry', async function (req, res) {
  var title = req.body.title;
  var content = req.body.content;
  var topicName = req.body.topic;
  var topic = await TopicModel.findOne({topic: topicName}).exec();

  await EntryModel.create({
    title: title,
    content: content,
    topic: topic._id
  }, (err, instance) => {
    if (err) return handleError(err);
    console.log('Entry created successfully')
  })
  res.redirect('/topics/' + topicName)
})

router.get('/:topic/:id', async function (req, res) {
  var entry = await EntryModel.findById(req.params.id);

  res.send(entry.title);
})

module.exports = router;