var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { currentURL: '/' });
});

router.get('/topics', function (req, res, next) {

  res.render('topics', {
    currentURL: '/topics'
  })
})

router.get('/new-entry', function (req, res, next) {
  res.render('new-entry', {
    currentURL: "/new-entry"
  })
})

router.post('/', function (req, res, next) {
  res.send('Got a POST request');
});

module.exports = router;