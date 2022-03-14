const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productosSchema = Schema({
    nombre: String,
    precio: Number,
    vendido: Number,
    stock: Number,
    idCategoria: { type: Schema.Types.ObjectId, ref: 'categorias' }
})

module.exports = mongoose.model('productos', productosSchema)