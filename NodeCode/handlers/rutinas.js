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
    let rutina = req.body['rutina'];
    let encontrar =  req.body['where'];
    let columnas = req.body['columnas']; 
    console.log(encontrar);

    //Vamos a buscar la rutina
    rutinas.buscarRutina(rutina).then(result=>{
        console.log(result);
        console.log(columnas);
        var objectQuery = rutinas.converToObject(result.columnas); //Al buscar la rutina vamos a convertirlos en un objectQuery que servira para poder hacer el query
        var whereQuery = rutinas.converToWhere(result.columnas, encontrar,result.relaciones); //Realizamos la clausula de where que se concatenara 
        var query = rutinas.convertToQuery(objectQuery,columnas) + ' ' + whereQuery; //Contatenamos el query con las limitaciones del where
        console.log(query); //Mostramos el query, quitarlo cuando no se tenga el debugging
        rutinas.executePromise(query).then(result => { //Ejecutamos el query, leemos los datos y enviamos al cliente que nos pidio el servicio


            /*enviar = result.map((columna) => {
               console.log(columna);
               return { "Array": columna }
           });*/


            //console.log(enviar);
            console.log(result.length);
            res.json(result)
            console.log("Envio la solicitud" + Date.now().toString());
      
            
        })
        
    });
})
module.exports = router; //Es el objeto que se encontrara al exportar este modulo, entonces exportamos el router.
