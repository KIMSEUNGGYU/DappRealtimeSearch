const express = require('express');
const router = express.Router();
const makeOptions = require('../controller/crawler');

router.get('/', function(req, res, next) {
    const resJson = makeOptions();
    console.log(10);
    console.log(resJson, 1);
    // console.log(res);
    // let host = resJson.hostname;
    // let data = resJson.data;
    // let date = resJson.date;
    // res.send(host, data, date);
});

// router.get('/', function(req, res, next) {
//     res.render('crawl', { result: '' });
// });
// router.get('/crawing', controller.crawler);

module.exports = router;
