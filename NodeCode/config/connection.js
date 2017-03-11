var Connection = require('tedious').Connection;  
var config = require('./db.json');

var connection = new Connection(config);
connection.on("connect",()=>{
    console.log("connected");
})


module.exports = connection;