var express = require('express');
var router = express.Router();
let elements = ['/images/2.jpg', '/images/3.jpg', '/images/4.jpg'];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', elements: elements , user: req.session.user});
});

module.exports = router;
