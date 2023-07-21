var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/* `app.listen(3000, () => { console.log("El servidor está levantado"); });` está iniciando el servidor
y escuchando en el puerto 3000. Una vez que se inicie el servidor, registrará el mensaje " El
servidor está levantado" a la consola. */
app.listen(3000, () => {
  console.log("El servidor está levantado");
});

app.use(session({
  secret: 'loginSQL',
  resave: true,
  saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);






/* El código `app.use(function(req, res, next) { next(createError(404)); });` está definiendo una
función de middleware en Express que maneja los errores 404. Esta función se ejecuta cuando ninguna
otra ruta o función de middleware coincide con la URL solicitada. Llama a la función `next()` con la
función `createError(404)` como argumento, que crea un nuevo error `404 Not Found` y lo pasa a la
siguiente función de middleware o controlador de errores. */
app.use(function(req, res, next) {
  next(createError(404));
});


/* El código `app.use(function(err, req, res, next) { ... })` está definiendo una función de middleware
de manejo de errores en Express. Esta función se ejecuta cada vez que se produce un error en la
aplicación. */
app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
 /* `res.status(err.status || 500)` establece el código de estado HTTP de la respuesta en el valor de
 `err.status` si existe; de lo contrario, lo establece en 500 (Error interno del servidor). */
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;