<<<<<<< HEAD
var Connection = require('tedious').Connection;  
var config = require("../config/db.json");


    var express = require('express');
    var router = express.Router();
    var Request = require('tedious').Request;
=======
var Connection = require('tedious').Connection;  //Estamos utilizando tedious para conectanos a MSSQL
    var config = {  //Objeto de la configuracion de la conexion
        userName: 'sa',  
        password: 'aitva',  
        server: 'serveravattia',  
        options: {database: 'EjerciciosJonathan',instanceName: 'avattia'}  
    };  
    //var connection = new Connection(config);  
    var express = require('express');
    var router = express.Router(); //Objeto router que nos permite dirigirnos a los diferentes URI
    var Request = require('tedious').Request; //Permite configurar los REQUEST a la base de datos
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
    var TYPES = require('tedious').TYPES;
    
    var resultado = {
        columnas: []
    };
<<<<<<< HEAD

    var result = {
        data: []
    }

    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    router.get('/', function(req, res) {
        console.log("get tables");
    var connection = new Connection(config);

    connection.on('connect', function(err){

=======
	
    var result = {
        data: []
    }
    
    router.use(function(req, res, next) { //Configuracion inicial del router
  	res.header("Access-Control-Allow-Origin", "*"); //Estas dos lineas permite Cross-Origins, permitiendole al cliente hacer requests.
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();//Debido a que la funcion no es asincrona, debemos hacer next para que se libere y no se quede colgado.
	});
   
    router.get('/', function(req, res) { //Escucha a la solicitud get de /tables/, el solo le asigna el /, el /tables se le asigna en server.js
        //el objeto req tiene la request, el objeto res se usa para la respuesta.
	console.log("get tables");
    	var connection = new Connection(config); //Nueva conexion con la configuracion hecha

    	connection.on('connect', function(err){  //Tratramos conectanos a la  base de datos.
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

<<<<<<< HEAD
     request = new Request("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES order by TABLE_NAME asc;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                resultado.columnas.push(column.value);
              } 
            });  

        });  
  
        request.on('doneProc', function(rowCount, more) {  
            console.log(resultado.columnas);
            res.json(resultado.columnas);  
        });  
        connection.execSql(request); 
});

=======

	//Creamos un nuevo request, y le damos query que queremos hacer.
     	request = new Request("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES order by TABLE_NAME asc;", function(err) {  
        	if (err) {  
            		console.log(err);}  
        	});  
         //Al procesar el request se estan esperando diferentes eventos de manera asincrona
        request.on('row', function(columns) {   //Espera cada fila del request. Se ejecuta una vez por cada fila que se encuentra.
            	columns.forEach(function(column) {  
              		if (column.value !== null) {  
                		resultado.columnas.push(column.value); //Guardamos el contenido en resultado.
              		} 
            	});  
        });  
  
        request.on('doneProc', function(rowCount, more) { //Se realiza cuando se  termina de recorrer el query.  
            	console.log(resultado.columnas);
            	res.json(resultado.columnas);  //Enviamos la respuesta por el objeto res, como json las columnas que se encontraron
        });  
		
        connection.execSql(request); //Cerramos la conexion a la base datos.
	});
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
    });

router.post('/', function(req, res) { //Responde a la solicitud post de /
    console.log("POST tables");
    var table = req.body.tabla;
    var resultado = {columnas : []}
    var connection = new Connection(config); //Nueva conexion

    connection.on('connect', function(err){ //Nos conectamos a la base de datos.

		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

    result = "";
    console.log(table);
	    //Se hace un nuevo resquest a la base de datos.
     request = new Request('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N\''+ table.toString() + "\';", function(err) {  
        	if (err) {  
            		console.log(err);} 
            	else{
               		//console.log(resultado.columnas);
               		res.json(resultado.columnas);  //Se manda el resultado como JSON por el objeto res.
            	}
        });  
          
        request.on('row', function(columns) {  //Se realiza por cada fila que se encuentre
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                resultado.columnas.push(column.value); // Guardamos el valor en resultado.columnas
              } 
            });  
        });  
        connection.execSql(request); //Cerramos la conexion a la base de datos.
    });
});

<<<<<<< HEAD

router.post('/columns', function(req, res) {
=======
router.post('/columns', function(req, res) { //Respondemos a post de /columns
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
    console.log("POST tables/COLUMNS");
    var table = req.body.tabla; //Obtemos el objeto tabla del cuerpo del resquest.
    var args = req.body.columns; //Obtemos el objeto columns del cuerpoo del request.
    result = {data : []};
<<<<<<< HEAD
    console.log(table);
    console.log(args);
    doQuery(table,args,res);
=======
    doQuery(table,args,res); //Buscamos dentro de la tabla, las columnas y se lo regresamos a res.
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
});

var doQuery = function (tabla,args,res){
    var columns = args.join();
    var result = {data : []};
    var connection = new Connection(config); // Nueva conexion a DB

    connection.on('connect', function(err){ //Nos conectamos a la base de datos.

		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

<<<<<<< HEAD
    request = new Request('SELECT TOP 1000'+ columns +' FROM ' + tabla.toString() + ";", function(err) {  
=======
    //result = {data: []}
    request = new Request('SELECT TOP 1000'+ columns +' FROM ' + tabla.toString() + ";", function(err) {   //Tomamos los primeros mil resultados.
>>>>>>> cffce4ef99e6fc35187824b554de802d10251b2a
        if (err) {  
            console.log(err);}
            else{
                res.json(result); //Al terminarse la resques el resultado lo mandamos al objeto res, como json.
            }  
        }); 
	    
        request.on('row', function(columns) {
            var object = {};  //Creamos un objeto vacio
            columns.forEach(function(column) {  
              if (column.value !== null) {
                object[column.metadata.colName]=column.value; //Le asignamos el nombre de la columna como llave y le asignamos el valor.
              } 
            });
            result.data.push(object); //Agregamos el objeto al resultado.
        });   
        connection.execSql(request); //Cerramos la conexion a la base de datos.
    });
    
}

router.post('/login', function(req, res) { //No funciona todavia, no usarse 
    var usuario = req.body.usuario;
    var pass = req.body.pass;
    var found = false;
    var connection = new Connection(config);

    connection.on('connect', function(err){

		if (err){
            console.log('Unable to connect to database');
			return err;
		} 
		else {
			console.log('connection to database established');
		}

     request = new Request('SELECT usuario , estatus, tipo ,  identifica FROM p_usua WHERE usuario = \''+ usuario+ "' AND password = '"+ passw + "';", function(err) {  
        if (err) {  
            console.log(err);} 
            else{
                res.json(resultado.columnas); 
            }
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                found = true;
              } 
            });  
        });  
        connection.execSql(request); 
    });
    
});
module.exports = router; //Es el objeto que se encontrara al exportar este modulo, entonces exportamos el router.
