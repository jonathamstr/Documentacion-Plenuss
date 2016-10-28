var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'sa',  
        password: 'aitva',  
        server: 'serveravattia',  
        // If you are on Microsoft Azure, you need this:  
        options: {database: 'EjerciciosJonathan',instanceName: 'avattia'}  
    };  
    var connection = new Connection(config);  
    var express = require('express');
    var router = express.Router();
    
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    var resultado = {
        columnas: ""
    };
    function executeStatement() {  
        request = new Request("SELECT top 1000 * from p_vede;", function(err) {  
        if (err) {  
            console.log("queso");
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                result+= column.value + " ";
              } 
            });  
            //console.log(result);
            //resultado.columnas+=result+"\n";  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
            console.log(rowCount + ' rows returned!!!!!!!!!!!!!!!!!!!!');  
        });  
        connection.execSql(request);  
    }

    connection.on('connect', function(err) {  
    // If no error, then good to proceed.  
        if (err) return console.error(err);
         //executeStatement();
    }); 
   /* router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });*/
router.post('/', function(req, res) {
    var user = req.body.user;
    var password = req.body.password;
     request = new Request('SELECT usuario , estatus, tipo ,  identifica FROM p_usua WHERE usuario = \''+ user+ "' AND password = '"+ password + "';", function(err) {  
        if (err) {  
            //console.log("queso");
            console.log(err);}  
        });  
          
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value !== null) {  
                result+= column.value + " ";
              } 
            });  
            //console.log(result);
             resultado.columnas = result;   
            //res.send(result);  
        });  
  
        request.on('doneProc', function(rowCount, more) {  
            console.log(rowCount + ' rows returned!!!!!!!!!!!!!!!!!!!!!!!'); 
            res.send(resultado.columnas);  
        });  
        connection.execSql(request); 
        console.log(resultado.columnas); 
        
  
});
module.exports = router;