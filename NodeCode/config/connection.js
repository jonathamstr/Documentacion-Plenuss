var Connection = require('tedious').Connection;  
var config = require('./db.json');

var connection = new Connection(config);



module.exports = connection;