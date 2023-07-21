/* Este código importa el módulo `mysql` y crea una conexión a una base de datos MySQL. */
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db4free.net',
    database: 'loginsql',
    user: 'diegobrasero',
    password: 'getafesector3',
    port: '3306'
});

/* El código `connection.connect((error) => { ... })` está estableciendo una conexión a la base de
datos MySQL. */
connection.connect((error) => {
    if(error){
        console.log('Error en la conexión con la base de datos');
        throw error;
    }else{
        console.log('La conexión con la base de datos se ha realizado');
    }
});

/* `module.exports = connection;` está exportando el objeto `connection` para que pueda usarse en otros
archivos. Al asignar `conexión` a `module.exports`, cualquier archivo que importe este módulo tendrá
acceso al objeto `conexión` y podrá usarlo para interactuar con la base de datos MySQL. */
module.exports = connection;