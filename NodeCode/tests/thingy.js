const util = require('util');
const vm = require('vm');
const connection = require('../config/connection');
var Request = require('tedious').Request;


const sandbox = {
    cat: "dog",
    dog: function () {
        console.log(cat);
    },
    console: console
}

const script = new vm.Script(`
    dog = function(){
        console.log("Hey there");
    }
`);

const context = new vm.createContext(sandbox);

script.runInContext(context)(console);
script.runInThisContext();
dog();


connection.on('connect', function (err) {
    var resultado = '2';
     resultado = executeStatement('select * from p_dic where proceso=\'C01\'',printResult);
    
    console.log(resultado);
});


function executeStatement(query,callback) {

    var result = [];
    request = new Request(query,
        function (err,rowCount) {
            connection.close();
           if (err) {
              return callback(err,null);
            }
            else{
                console.log(rowCount + ' rows');
            }
           return callback(null,result); 
        });


    request.on('row',row);


    function row(columns){
        var values = [];

        columns.forEach(function(column){
            if(column.value === null){
                    value = 'NULL';
            }
            else{
                value = column.value;
            }
            values.push(value);
        });

        result.push(values);
    }

    connection.execSql(request);
}



function printResult(err,result){
    console.log(result);
    var objectQuery = converToQuery(result);
    
}


function converToQuery(columns){
    var tables = {};

    columns.forEach(column=>{
        if(!tables[column[2]]){
            tables[column[2]] = [];
        }
            tables[column[2]].push(column[3]);
        
    });

    return tables;
}