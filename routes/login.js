var express = require('express');
var router = express.Router();
const database = require('../database');
const dbUser = require('../database/model/user.model')

/*GET users listing*/
router.get('/', function(req, res, next) {
    res.render('login' , { title: 'Login', user: req.session.user}); //en estas plantillas puedo guardar toda la info que quiera
    //console.log(req.session); -> objeto común para usuario, puedo guardar información del objeto sesión
});

//Método POST para el login
router.post('/', async function(req, res, next) {
    //console.log(req.body); comprueba que datos le llegan
    /*const { username, password } = req.body; //todo lo del formulario llega por el BODY, por eso hago req.body
    if (username && password) {
      //le pido cosas con req
      req.session.loggedin = true;
      req.session.username = username;
      //la respuesta: si es correcta, le mando a restricted
      res.redirect('/restricted'); //redirijo a página principàl*/

      //OTRA FORMA: puede guardarlo y hacer el checkLogin
    const { username, password } = req.body;
    const isValidLogin = await dbUser.isLoginRight(username, password);
    if (isValidLogin) {
      req.session.message = "¡Login correcto!";
      req.session.username = {username:username};
      res.redirect('/chat');
    } else {
      req.session.error = "Usuario o contraseña incorrectos";
      //sino fuera correcto, le mando a login
      res.redirect('/');
    }
});

module.exports = router;

//OJO! Él hace que esta función del login sea async porque la que mete como comprobación (isLoginRight) es una promesa