const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var usuariosSchema = Schema({
    nombre: String,
    password: String,
    rol: String,
    carrito:[{
        idProductos:{type:Schema.Types.ObjectId, ref:'productos'},
        nombreProducto: String,
        cantidad: Number,
        precio: Number,
        subtotal: Number,
    }],
     totalCarrito: Number
})

module.exports=mongoose.model('usuarios',usuariosSchema)