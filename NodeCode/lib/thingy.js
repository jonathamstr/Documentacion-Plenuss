const util = require('util');
const vm = require('vm');
const connection = require('../config/connection');
var Request = require('tedious').Request;



connection.on('connect', function (err) {

})


function executeStatement(query, callback) {
    var result = [];
    var request = new Request(query,
        function (err, rowCount) {
            if (err) {
                return callback(err, null);
            }
            return callback(null, result);
        });
    request.on('row', row);

    function row(columns) {
        var values = [];

        columns.forEach(function (column) {
            if (column.value === null) {
                value = 'NULL';
            } else {
                value = column.value;
            }
            values.push(value);
        });
        result.push(values);
    }
    connection.execSql(request);
}

function executePromise(query){
    return new Promise((resolve,reject)=>{
        executeStatement(query,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result);
            }
        })
    });
}

function printResult(err, result) {
    console.log(result);
    var objectQuery = converToObject(result);
    var query = convertToQuery(objectQuery);
    console.log(query);
    executeStatement(query, (err, resultado) => {
        console.log(resultado);
        connection.close();
    });


}


function converToObject(columns) {
    var tables = {};

    columns.forEach(column => {
        if (!tables[column[2]]) {
            tables[column[2]] = [];
        }
        tables[column[2]].push(column[3]);
    });
    return tables;
}


function convertToQuery(objectQuery) {
    var tablesToQuery = '';
    var columnsToQuery = '';
    var tablas = [];
    var tablasColumnas = [];
    for (var propiedad in objectQuery) {
        tablas.push(propiedad);
        for (let columna of objectQuery[propiedad]) {
            tablasColumnas.push(propiedad + '.' + columna);
        }
    }
    tablesToQuery = tablas.join(',');
    columnsToQuery = tablasColumnas.join(',');
    return `select ${columnsToQuery} from ${tablesToQuery}`;
}


function buscarRutina(rutina) { 
    var resultado = {};
    return new Promise(function (resolve, reject) {
        executeStatement(`select * from p_dic where proceso='${rutina}'`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resultado['columnas'] = result;
                executeStatement(`select * from p_relacion where proceso='${rutina}'`,(err,result)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resultado['relaciones'] = result;
                        resolve(resultado);
                    }
                })
            }
        });
    });
}

function buscarRelaciones(rutina){
    return new Promise(function (resolve, reject) {
        executeStatement(`select * from p_relacion where proceso='${rutina}'`, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function converToWhere(columnas,aEncontrar){
    var resultado = [];
    for(var columna of columnas){
        for(var findNoun of aEncontrar){
            if(columna[5]===findNoun[0]){
                resultado.push(`${columna[2]}.${columna[3]}='${findNoun[1]}'`);
            }
        }
    }
    if(resultado.length > 0)
        return 'where ' + resultado.join(' and ');
    return '';
}

module.exports = {
    buscarRutina,
    convertToQuery,
    converToObject,
    executeStatement,
    buscarRelaciones,
    executePromise,
    converToWhere
}