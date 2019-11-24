var express = require('express');
var router = express.Router();
var resCrawling = require('../../Crawler');

// console.log(resCrawling);

/* GET home page. */
router.get('/', function(req, res, next) {
  resCrawling().then(function(data) {
    //console.log('dddd', data);
    res.render('index', { title: 'Naver Crawling', data });
  });
});

module.exports = router;
