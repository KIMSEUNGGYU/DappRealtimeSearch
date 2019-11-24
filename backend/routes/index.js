const router = require('express').Router();
const {getHome} = require('../controller');

/* GET home page. */
router.get('/', getHome);

module.exports = router;
