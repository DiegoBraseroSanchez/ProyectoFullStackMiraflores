/* En este fragmento de código, `var express = require('express')` importa el módulo Express y lo
asigna a la variable `express`. */
var express = require('express');
var router = express.Router();

/* GET users listing. */
/* El código `router.get('/', function(req, res, next) {
  res.send('responder con un recurso');
});` está definiendo una ruta para una solicitud GET a la URL raíz ("/"). */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* `module.exports = router;` está exportando el objeto `router` para que pueda usarse en otros
archivos. Cuando se requiere un archivo usando `require()`, se devuelve el objeto exportado. En este
caso, el objeto `router` se exporta para que pueda usarse en otros archivos para definir rutas y
manejar solicitudes. */
module.exports = router;
