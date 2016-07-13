var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title : 'Hello, world!',
    id : 'main',
    links: [
      { name : 'Google', url : 'http://google.com/' },
      { name : 'Facebook', url : 'http://facebook.com/' },
      { name : 'Twitter', url : 'http://twitter.com/' }
    ],
    upperHelper : function (string) {
      return string.toUpperCase();
    }
  });
});

module.exports = router;
