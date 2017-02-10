var Sequelize = require('sequelize');
var db = require("../config/db");

var sequelize = new Sequelize(db.options.database,db.userName,db.password,{
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

var Producto = sequelize.define('p_prod',{
    Producto: {
        type: Sequelize.STRING,
        field: "producto"
    },
    Desc1: {
        type: Sequelize.STRING,
        field: "desc1"
    }
},
{
     timestamps: false,
      freezeTableName: true,
}
/*,{
    classMethods:{

    },
    instanceMethods:{
        
    }
}*/);

module.exports = Producto;
