'use strict';

var port = process.env.PORT || 8000; //Encuentra el puerto al cual escuchar. Buscar la variable de entorno o es 8000

//bibliotecas que se necesitan para el funcionamiento de la aplicacion
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui');
var path = require('path');

//Buscamos los controladores que vamos a usar dentro de nuestra aplicacion
var pprod = require('./handlers/pprod');
var tablas = require('./handlers/tablas');
var auth = require('./handlers/auth');

var app = express(); //Creamos una aplicacion que muestra
var server = http.createServer(app); //Creamos el servidor con la aplicacion

app.use(bodyParser.json()); //Para poder leer los cuerpos con json
app.use(bodyParser.urlencoded({     //Para leer atributos codificados en el URL
  extended: true
})); 

/*
//----------Permite crear los documentos del API, que estan configuradors en ./config/api.json, no es necesario.
app.use(swaggerize({
    api: path.resolve('./config/api.json'),
    handlers: path.resolve('./handlers'),
    docspath: '/swagger' 
}));

app.use('/docs', swaggerUi({
  docs: '/swagger'  
}));
*/

app.get('/',function(req,res){ //Respondemos a la solicitud GET con Hello World
  res.send('Hello World!');
});

//Utilizamos los objetos que importamos y les estamos asignados los URI a los cuales responderan.
app.use('/pprod',pprod); 
app.use('/tables',tablas);
app.use('/auth',auth);
server.listen(port, function () { //Iniciamos el servidor
});
