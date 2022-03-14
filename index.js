const mongoose = require('mongoose');
const app = require('./app');
var controllerUser = require('./src/controllers/usuarios.controller')
var Categorias = require('./src/models/categorias.model');
const productoModel = require('./src/models/producto.model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ventaEnLinea', {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Se encuentra conectado a la base de datos");

    app.listen(3000, function(){
        console.log("Esta corriendo en el puerto 3000")
    })

   controllerUser.registarAdminDefecto();
   
   Categorias.find({ nombre: 'default' }, (err, categoriaEncontrada) => {
    if (categoriaEncontrada.length == 0) {
        var productoModel = new Categorias()
        productoModel.nombre = 'default'
        productoModel.save((err, categoriaEncontrada) => {
            console.log(categoriaEncontrada)
        })
        console.log("se ha creado la categoria")
    } else {
        console.log("categoria ya existe")
    }
})


}).catch(err => console.log(err))