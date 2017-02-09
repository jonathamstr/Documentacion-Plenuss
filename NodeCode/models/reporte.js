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
    producto: Sequelize.STRING,
    desc1: Sequelize.STRING
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

Producto.findAll().then(Productos=>{
    console.log(Productos);
});