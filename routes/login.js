var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login' , { title: 'Express', user: req.session.user}); //en estas plantillas puedo guardar toda la info que quiera
    //console.log(req.session); -> objeto común para usuario, puedo guardar información del objeto sesión
});

//Método POST para el login
router.post('/', function(req, res, next) {
    //console.log(req.body); comprueba que datos le llegan
    const { username, password } = req.body; //todo lo del formulario llega por el BODY, por eso hago req.body
    if (username && password) {
      //le pido cosas con req
      req.session.loggedin = true;
      req.session.username = username;
      //la respuesta: si es correcta, le mando a restricted
      res.redirect('/restricted'); //redirijo a página principàl

      //OTRA FORMA: puede guardarlo y hacer el checkLogin
      //req.session.user = {username:user};

    } else {
      res.send('Usuario o contraseña incorrectos');
      //sino fuera correcto, le mando a login
      res.redirect('/login');
    }
});

module.exports = router;