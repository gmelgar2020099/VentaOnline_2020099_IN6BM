
var express = require('express');
const cors = require('cors');
var app = express();

//IMPORTACIONES RUTAS
const rutasUsuario = require('./src/routes/usuarios.routes');
const rutaProducto = require('./src/routes/producto.routes');
const rutaCategoria = require('./src/routes/categorias.routes');
const rutaFactura = require('./src/routes/facturas.routes')

//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//CABECERAS
app.use(cors());

//CARGA DE RUTAS se realizaba como localhost:3000/obtenerProductos
app.use('/api', rutasUsuario, rutaProducto, rutaCategoria, rutaFactura);


module.exports = app;
