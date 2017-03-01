var Sequelize = require('sequelize');
var db = require("../config/db");
var definition = require("./definitions/p_prod");

var sequelize = new Sequelize(db.options.database, db.userName, db.password, {
    host: db.server,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        instanceName: db.options.instanceName
    }


});

var Producto = sequelize.define(definition.ObjectDefinition, {
        "definition.ColumnsDefinition[0].Name": {
            type: definition.ColumnsDefinition[0].Type,
            field: definition.ColumnsDefinition[0].Field
        },
        "definition.ColumnsDefinition[1].Name": {
            type: definition.ColumnsDefinition[1].Type,
            field: definition.ColumnsDefinition[1].Field
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: "p_prod"
    }
    /*,{
        classMethods:{

        },
        instanceMethods:{
            
        }
    }*/
);

module.exports = Producto;