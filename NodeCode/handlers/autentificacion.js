var express = require('express');
var router = express.Router(); //Objeto router que nos permite dirigirnos a los diferentes URI
var Request = require('tedious').Request; //Permite configurar los REQUEST a la base de datos
var TYPES = require('tedious').TYPES;
let rutinas = require('../lib/thingy');

router.use(function (req, res, next) { //Configuracion inicial del router
    res.header("Access-Control-Allow-Origin", "*"); //Estas dos lineas permite Cross-Origins, permitiendole al cliente hacer requests.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); //Debido a que la funcion no es asincrona, debemos hacer next para que se libere y no se quede colgado.
});
router.post('/', (req, res) => {
    console.log(res.body);
    let usuario = req.body['Usuario'];
    let pass =  req.body['Password']; 

    //Vamos a buscar la rutina
    rutinas.executePromise(`select * from p_usua where usuario = '${usuario}' and password = '${pass}'`).then((result)=>{
        if(result.length >=1){
            console.log(result[0]);
            res.json(result[0]);
        }
        else {
            res.json(null);
        }
    })
})
module.exports = router; //Es el objeto que se encontrara al exportar este modulo, entonces exportamos el router.
