var express = require('express');
var router = express.Router();
var elements = ['/images/2.jpg', '/images/3.jpg', '/images/4.jpg'];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial', elements: elements });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

//Método POST para el login
router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    req.session.loggedin = true;
    req.session.username = username;
    res.redirect('/restricted'); //redirijo a página principàl
  } else {
    res.send('Usuario o contraseña incorrectos');
  }
});

//Página restringida (solo accesible si el usuario está logueado) 
router.get('/restricted', function(req, res, next) {
  if (req.session.loggedin) {
    res.send('Bienvenido, ' + req.session.username + '! Esta es una página restringida.');
  } else {
    res.send('Por favor, inicia sesión para ver esta página.');
  }
});

module.exports = router;
