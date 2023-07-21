 /* La línea `const connection = require('../database');` está importando el objeto `connection` desde
 el módulo `../database`. Es probable que este módulo contenga el código para establecer una
 conexión a una base de datos MySQL . Al importar el objeto `conexión`, el código
 puede usarlo para ejecutar consultas de base de datos y realizar operaciones en la base de datos. */
 const connection = require('../database');



 /* La función `exports.save` es responsable de guardar los datos del usuario en una tabla de base de
 datos llamada `user_login`. */
 exports.save = (req, res)=>{
     const user_email = req.body.user_email;
     const user_password = req.body.user_password;
     connection.query('INSERT INTO user_login SET ?',{user_email:user_email, user_password:user_password}, (error, result)=>{
        if (error) {
            console.log(error)
        }else{
            res.redirect('/');
        }
 })
}



/* La función `exports.update` se encarga de actualizar los datos del usuario en la tabla `user_login`
de la base de datos. */
exports.update = (req, res)=>{
    const user_id = req.body.user_id;
    const user_email = req.body.user_email;
    const user_password= req.body.user_password;
     connection.query('UPDATE user_login SET ? WHERE user_id= ?', [{user_email:user_email, user_password:user_password}, user_id], (error, result)=>{
        if (error) {
            console.log(error)
        }else{
            res.redirect('/');
        }
    })

}