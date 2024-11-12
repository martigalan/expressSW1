const createError = require('http-errors');
const express = require('express');
const session = require('express-session'); //útil, nos ayuda a manejar la sesión -> aquí aparecerá cookie, y nos ayudará a identificar a ese cliente
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const restrictedRouter = require('./routes/restricted');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware de sesión -> mecanismo para guardar la sesión (cookie)
app.use(session({
  secret: 'miSecreto', //aquí ponemos un objeto de configuración, el string que queramos
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //podemos ver las cookies que hay en el navegador, en Storage -> Application
}));

// dependencias
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', restrictedRouter);
/*app.use('/restricted', checkLogin, restrictedRouter); //aquí puedo añadir todos los callbacks que yo quiera. Se ejecutarán en orden
app.use('/logout', (req,res)=>{
  req.session.destroy(); //este objeto sesión es ESPECÍFICO de cada usuario/cada cookie -> CADA USUARIO TIENE SÓLO 1 COOKIE!
  res.redirect('/');
})

//comprobar si el usuario ha iniciado sesión
function checkLogin(req, res, next) {
  if(req.session.user){
    next(); //procesa lo siguiente que viene en la cadena; en este caso: restrictedRouter
  } else {
    res.redirect('login');
  }
}*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
