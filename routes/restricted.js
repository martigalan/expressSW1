var express = require('express');
var router = express.Router();

//NO definir dos métodos que redirigen al mismo sitio con info distinta, puede dar fallos
router.get('/', function(req, res, next) {
    //console.log(req.session)
    res.render('restricted', { title: 'Express', username: req.session.username});
    //Página restringida (solo accesible si el usuario está logueado) 
    if (req.session.loggedin) {
        res.send('Bienvenido, ' + req.session.username + '! Esta es una página restringida.');
      } else {
        res.send('Por favor, inicia sesión para ver esta página.');
    }
});

module.exports = router;