const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var facturaSchema = Schema({
    idUsuario:{type:Schema.Types.ObjectId,ref:'usuarios'},
    nit : String,
    lista: [{
        nombreProducto: String,
        cantidad: Number,
        precio: Number,
        subtotal: Number,
    }],
    totalFactura: String,


})

module.exports=mongoose.model('facturas',facturaSchema)