var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  if (req.session.username) {
    next();  //Si el usuario está autenticado, pasa al siguiente middleware
  } else {
    res.redirect('/login');  //Si no, redirige a login
  }
});

router.get('/', (req, res) => {
  res.render('chat', { title:'SW1', user: req.session.username });
});

module.exports = router;
