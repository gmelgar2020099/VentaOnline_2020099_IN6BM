const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var categoriaSchema = Schema({
    nombre: String,
})

module.exports=mongoose.model('categorias',categoriaSchema)