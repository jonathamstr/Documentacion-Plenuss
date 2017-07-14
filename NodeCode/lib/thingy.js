const util = require('util');
const vm = require('vm');
const connection = require('../config/connection');
var Request = require('tedious').Request;



connection.on('connect', function (err) {

})

//Executes a query in the data base that is returned
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

//Same as executeStatement but in the form of a Promise instead of a callback
//Executes a query in the database 
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

//Convertimos al objetoQuery que nos ayuda a formar el query despues.
//Agrega un atributo con el nombre de la tabla y encuentra los valores que son necesarios, busca las columnas y si estas son obligatorias

function converToObject(columns) {
    var tables = {};

    columns.forEach(column => {
        if (!tables[column[2]]) { //Si no se encuentra dentro de nuestro objeto lo agregamos al objeto
            tables[column[2]] = []; //Hacemos un array con el nombre de la tabla en la columas
        }
        tables[column[2]].push([column[3],column[4]]);
    });
    console.log(tables);
    return tables; //Regresamos el objeto
}


function convertToQuery(objectQuery,columnas) {
    var tablesToQuery = '';
    var columnsToQuery = '';
    var tablas = [];
    var tablasColumnas = [];
    for (var propiedad in objectQuery) {
        tablas.push(propiedad);
        for (let columna of objectQuery[propiedad]) {
            if(columna[1]==='S'){
                tablasColumnas.push(propiedad + '.' + columna[0]);
            }
            else{
                if(columnas!==undefined){
                    if(columnas.indexOf(columna[0]>-1)){
                        tablasColumnas.push(propiedad + '.' + columna[0]);
                    }
                }
            }
                
        }
    }
    tablesToQuery = tablas.join(',');
    columnsToQuery = tablasColumnas.join(',');
    return `select top 15000 ${columnsToQuery} from ${tablesToQuery}`;
}

//Se busca en la base de datos
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


function converToWhere(columnas,aEncontrar,join){
    var resultado = [];
    for(var columna of columnas){
        for(var findNoun in aEncontrar){
            console.log(findNoun);
            if(columna[5]===findNoun.toString()){
                console.log(aEncontrar[findNoun]);
                if(aEncontrar[findNoun].length!==2)
                    resultado.push(`${columna[2]}.${columna[3]}='${aEncontrar[findNoun][0]}'`);
                else
                    resultado.push(`${columna[2]}.${columna[3]} between '${aEncontrar[findNoun][0]}' and '${aEncontrar[findNoun][1]}'`);
                console.log("paso");
            }
        }
    }
    for (var jo of join) {
        resultado.push(`${jo[1]}.${jo[2]} = ${jo[3]}.${jo[4]}`)
    }
    if(resultado.length > 0)
        return 'where ' + resultado.join(' and ');
    return '';
}
//this is a thing

module.exports = {
    buscarRutina,
    convertToQuery,
    converToObject,
    executeStatement,
    buscarRelaciones,
    executePromise,
    converToWhere
}