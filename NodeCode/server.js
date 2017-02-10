'use strict';

var port = process.env.PORT || 8000; // first change

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui'); // second change
var path = require('path');
var pprod = require('./handlers/p_prod');
var tablas = require('./handlers/tablas');
var auth = require('./handlers/auth');
var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(swaggerize({
    api: path.resolve('./config/api.json'), // third change
    handlers: path.resolve('./handlers'),
    docspath: '/swagger' // fourth change
}));
app.get('/',function(req,res){
  res.send('Hello World!');
});
// change four
app.use('/docs', swaggerUi({
  docs: '/swagger'  
}));
app.use('/pprod',pprod);
app.use('/tables',tablas);
app.use('/auth',auth);
server.listen(port, function () { // fifth and final change
});