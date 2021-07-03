var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    sayhi: 1,
    title: 'homess' });
});

module.exports = router;
