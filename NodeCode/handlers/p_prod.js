var express = require('express');
var router = express.Router();
var Producto = require('../models/p_prod');


router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.get("/",(req,res)=>{
    Producto.findAll().then(Productos=>{
        res.json(Productos);
    });
})

module.exports = router;