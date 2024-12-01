const createError = require('http-errors');
const express = require('express');
const session = require('express-session'); //útil, nos ayuda a manejar la sesión -> aquí aparecerá cookie, y nos ayudará a identificar a ese cliente
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const restrictedRouter = require('./routes/restricted');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');

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

//para mostrar las alertas. OJO! todo lo de LOCALS está accesible en todo el rato que hagamos la petición, tb bueno porque está a la altura de "views"
/*app.use((req,res,next) => {
  //PETICIONES
  //le muestro las alertas creadas con boostrap
  const message = req.locals.message;
  const error = req.locals.error;
  //elimino las alertas y NUNCA más 
  delete req.session.message;
  delete req.session.error;
  //RESPUESTA
  //lo mismo que antes pero mostrándolo?
  res.locals.message = "";
  res.locals.error = "";
  if(message){res.locals.message = `<p>${message}</p>`};
  if(error){res.locals.error = `<p>${message}</p>`};
  next(); //OJO! IMPORTANTE esta línea para continuar el flujo de las instrucciones
});*/

// dependencias
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "El string que queráis", //cryptographic secret used to sign session cookies
  resave: false, //controls whether to resave the session even if it's unmodified
  //Setting it to false prevents unnecessary writes to the session store.
  saveUninitialized: true //controls whether to save new sessions that don't have any data yet.
  //Setting it to true ensures that new sessions are created and saved.
}));
//code ensuring that any messages or errors stored in the session are displayed in the 
//appropriate place in your views and then cleared from the session
app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message){res.locals.message = `<p>${message}</p>`};
  if(error){res.locals.error = `<p>${error}</p>`};
  next();
});

// rutas
app.use('/', indexRouter);
app.use('/login', loginRouter);
//app.use('/restricted', restrictedRouter);
app.use('/restricted', checkLogin, restrictedRouter); //aquí puedo añadir todos los callbacks que yo quiera. Se ejecutarán en orden
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/logout', (req,res)=>{
  req.session.destroy(); //este objeto sesión es ESPECÍFICO de cada usuario/cada cookie -> CADA USUARIO TIENE SÓLO 1 COOKIE!
  res.redirect('/');
})

//comprobar si el usuario ha iniciado sesión
function checkLogin(req, res, next) {
  if(req.session.username){
    next(); //procesa lo siguiente que viene en la cadena; en este caso: restrictedRouter
  } else {
    res.redirect('login');
  }
}

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
