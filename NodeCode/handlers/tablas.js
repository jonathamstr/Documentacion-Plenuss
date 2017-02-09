var Connection = require('tedious').Connection;  
var config = require("../config/db.json");


    var express = require('express');
    var router = express.Router();
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    var resultado = {
        columnas: []
    };

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

		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

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

    });

router.post('/', function(req, res) {
    console.log("POST tables");
    var table = req.body.tabla;
    var resultado = {columnas : []}
    var connection = new Connection(config);

    connection.on('connect', function(err){

		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

    result = "";
    console.log(table);
     request = new Request('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N\''+ table.toString() + "\';", function(err) {  
        if (err) {  
            console.log(err);} 
            else{
                console.log(resultado.columnas);
                res.json(resultado.columnas); 
            }
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                resultado.columnas.push(column.value);
              } 
            });  
        });  
        connection.execSql(request); 
    });
       
        
});


router.post('/columns', function(req, res) {
    console.log("POST tables/COLUMNS");
    var table = req.body.tabla;
    var args = req.body.columns;
    result = {data : []};
    console.log(table);
    console.log(args);
    doQuery(table,args,res);
});

var doQuery = function (tabla,args,res){
    var columns = args.join();
    var result = {data : []};
    var connection = new Connection(config);

    connection.on('connect', function(err){

		if (err){
			console.log(err);
			console.log('Unable to connect to database');
		} 
		else {
			console.log('connection to database established');
		}

    request = new Request('SELECT TOP 1000'+ columns +' FROM ' + tabla.toString() + ";", function(err) {  
        if (err) {  
            console.log(err);}
            else{
                res.json(result);
            }  
        }); 
        request.on('row', function(columns) {
            var object = {};  
            columns.forEach(function(column) {  
              if (column.value !== null) {
                object[column.metadata.colName]=column.value;
              } 
            });
            result.data.push(object); 
        });   
        connection.execSql(request);
    });
    
}

router.post('/login', function(req, res) {
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
module.exports = router;