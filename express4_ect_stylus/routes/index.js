var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  req.session.count = req.session && req.session.count ? req.session.count+1 : 1;

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
    },
    sessionCount: req.session.count
  });
});

module.exports = router;
