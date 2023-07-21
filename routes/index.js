/* Estas líneas de código importan los módulos necesarios y configuran el enrutador para la aplicación. */
var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
/* Este código define una ruta para la URL raíz ("/"). Cuando se realiza una solicitud GET a la URL
raíz, se ejecuta la función especificada como segundo argumento. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

/* El código está definiendo una ruta para la ruta URL "/login" y especificando que debe manejar las
solicitudes POST. Cuando se realiza una solicitud POST a la ruta "/login", se ejecuta la función
especificada como segundo argumento. */
router.post('/login', (req, res, next) => {
  var user_email_address = req.body.user_email_address; 
  var user_password = req.body.user_password;

  /* Este bloque de código maneja la funcionalidad de inicio de sesión. Comprueba si el usuario ha
  proporcionado tanto una dirección de correo electrónico como una contraseña. Si se proporcionan
  ambos campos, construye una consulta SQL para seleccionar al usuario de la base de datos en
  función de la dirección de correo electrónico proporcionada. Luego ejecuta la consulta usando la
  función `database.query()`. */
  if(user_email_address && user_password){
    query = `SELECT * FROM user_login WHERE user_email="${user_email_address}"`;
    database.query(query, (error, data) => { 
      if(data.length > 0){
        for(i = 0; i < data.length; i++){
          if(data[i].user_password == user_password){
            req.session.user_id = data[i].user_id;
            res.redirect('/');
          }else{
            res.send('Contraseña incorrecta');
          }
        }
      }else{
        res.send('Email incorrecto');
      }
      res.end();
    })
  }else{
    res.send('Por favor, introduce un user y contraseña válido');
    res.end();
  }
})




/* El código `router.get('/logout', (req, res, next) => { ... })` define una ruta para la URL "/logout"
y especifica que debe manejar las solicitudes GET. Cuando se realiza una solicitud GET a la ruta
"/logout", se ejecuta la función especificada como segundo argumento. */
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
})

/* El código `router.get('/register', (req, res, next) => { res.render('register'); });` está
definiendo una ruta para la URL "/register" y especificando que debe manejar las solicitudes GET.
Cuando se realiza una solicitud GET a la ruta "/registrar", ejecuta la función especificada como
segundo argumento. En este caso, la función representa la vista de "registro" y la envía como
respuesta. */
router.get('/register', (req, res, next) => {
  res.render('register');
});

/* El código `router.get('/inicio', (req, res, next) => { res.render('inicio'); });` está definiendo
una ruta para la URL "/inicio" y especificando que debe manejar las solicitudes GET. Cuando se
realiza una solicitud GET a la ruta "/inicio", ejecuta la función especificada como segundo
argumento. En este caso, la función muestra la vista "inicio" y la envía como respuesta. */
router.get('/inicio', (req, res, next) => {
  res.render('inicio');
});



/* El código `router.post('/crearUsuario', (req, res, next) => { ... })` está definiendo una ruta para
la URL "/crearUsuario" y especificando que debe manejar solicitudes POST. Cuando se realiza una
solicitud POST a la ruta "/crearUsuario", se ejecuta la función especificada como segundo argumento. */
router.post('/crearUsuario', (req, res, next) => {
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;

  /* Este bloque de código maneja la funcionalidad de crear un nuevo usuario en la base de datos. */
  if(user_email_address && user_password){
    query = `INSERT INTO user_login (user_email, user_password) VALUES ("${user_email_address}", "${user_password}")`;
    database.query(query, (error) => {
      if (error) {
        throw error
      }
    })
  }else{
    res.send('Introduce un usuario válido para el registro');
  }
  res.redirect('/');
  res.end();
})
/* El código `router.get('/update', (req, res, next) => { res.render('update'); });` define una ruta
para la URL "/update" y especifica que debe manejar las solicitudes GET. Cuando se realiza una
solicitud GET a la ruta "/update", ejecuta la función especificada como segundo argumento. En este
caso, la función representa la vista de "actualización" y la envía como respuesta. */
router.get('/update', (req, res, next) => {
  res.render('update');
});

/* El código `router.post('/actualizarDatos', (req, res, next) => { ... })` está definiendo una ruta
para la URL "/actualizarDatos" y especificando que debe manejar las solicitudes POST. Cuando se
realiza una solicitud POST a la ruta "/actualizarDatos", se ejecuta la función especificada como
segundo argumento. */
router.post('/actualizarDatos', (req, res, next) => {
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;
  var user_password_new = req.body.user_password_new;

  /* Este bloque de código maneja la funcionalidad de actualizar la contraseña de un usuario en la base
  de datos. */
  if(user_email_address && user_password && user_password_new){
    query = `SELECT * FROM user_login WHERE user_email="${user_email_address}"`;
    database.query(query, (error, data) => {
      if (data[0].user_password == user_password) {
        query = `UPDATE user_login SET user_password="${user_password_new}" WHERE user_email="${user_email_address}"`;
        database.query(query, (error) => {
          if (error) {
            console.log(error);
          }
        })
      }else{
        res.send(error);
      }
    })
  }else{
    res.send('Completa los campos');
  }
res.redirect('/');
res.end();
})

/* El código `router.get('/delete', (req, res, next) => { res.render('delete'); })` define una ruta
para la URL "/delete" y especifica que debería manejar solicitudes GET. Cuando se realiza una
solicitud GET a la ruta "/delete", ejecuta la función especificada como segundo argumento. En este
caso, la función representa la vista "eliminar" y la envía como respuesta. */
router.get('/delete', (req, res, next) => {
  res.render('delete');
})

/* El código `router.post('/borrarUser', (req, res, next) => { ... })` define una ruta para la URL
"/borrarUser" y especifica que debe manejar las solicitudes POST. Cuando se realiza una solicitud
POST a la ruta "/borrarUser", se ejecuta la función especificada como segundo argumento. */
router.post('/borrarUser', (req, res, next) => {
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;
  console.log(user_password);

  /* Este bloque de código maneja la funcionalidad de eliminar un usuario de la base de datos. */
  if(user_email_address && user_password){
    query = `SELECT * FROM user_login WHERE user_email="${user_email_address}"`;
    database.query(query, (error, data) => {
      if (data[0].user_password == user_password) {
        query = `DELETE FROM user_login WHERE user_email="${user_email_address}"`;
        database.query(query, (error) => {
          if (error) {
            console.log(error);
          }
        })
      }else{
        res.send(error);
      }
    })
  }else{
    res.send('Completa los campos');
  }
req.session.destroy();
res.redirect('/');
res.end();
})


//REGISTRO RUTAS 2 FORMULARIO
/* El código `router.post('/registro', (req, res, next) => { ... })` define una ruta para la URL
"/registro" y especifica que debe manejar las solicitudes POST. Cuando se realiza una solicitud POST
a la ruta "/registro", se ejecuta la función especificada como segundo argumento. */
router.post('/registro', (req, res, next) => {
  var user_email_address = req.body.user_email_address;
  var user_password = req.body.user_password;
  var user_nombre = req.body.user_nombre;
  var user_apellido = req.body.user_apellido;
  var user_ruta = req.body.user_ruta;


  /* Este bloque de código maneja la funcionalidad de crear un nuevo usuario en la base de datos. */
  if(user_email_address && user_password && user_nombre && user_apellido && user_ruta){
    query = `INSERT INTO use_loginrutas (user_email, user_password, user_nombre, user_apellido, user_ruta) VALUES ("${user_email_address}", "${user_password}", "${user_nombre}", "${user_apellido}", "${user_ruta}")`;
    database.query(query, (error) => {
      if (error) {
        throw error
        
      }
    })
  }else{
    res.send('Introduce un usuario válido para el registro');
  }
  res.redirect('/registro');
  res.end();
})

router.get('/registro', (req, res, next) => {
  res.render('registro');
});










//CODIGO DE PRUEBA

router.get('/admi', (req, res)=>{
   
  connection.query('SELECT * FROM user_login ',(error, results)=>{
      if (error) {
          throw error;
      }else{
          res.render('admi',{results:results})
      }
  })
})

//RUTA PARA CREAR REGISTROS
router.get('/create',(req, res)=>{
  res.render('create');
})

//RUTA PARA EDITAR REGISTRO
router.get('/edit/:user_id', (req, res)=>{
  const user_id = req.params.user_id;
  connection.query('SELECT * FROM user_login WHERE user_id=?',[user_id], (error, results)=>{
      if (error) {
          throw error;
      }else{
          res.render('edit',{user_email:results[0]});
      }
  })
})
//RUTA PARA ELIMINAR EL REGISTRO
router.get('/delete/:user_id', (req, res)=>{
  const user_id = req.params.user_id;
  connection.query('DELETE FROM user_login WHERE user_id= ?', [user_id], (error, results)=>{
      if (error) {
          throw error;
      }else{
          res.redirect('/')
      }
  })
});
const crud = require('../controllers/crud');
const connection = require('../database');
router.post('/save', crud.save);
router.post('/update', crud.update);



/* `module.exports = router;` está exportando el objeto `router` para que pueda usarse en otros
archivos. Esto permite que otros archivos accedan y utilicen las rutas definidas en este archivo. */
module.exports = router;
