const express = require('express');
const productoController = require('../controllers/productos.controller');
const md_autentificacion = require('../middlewares/aut');

var app = express.Router();


app.post('/agregarProducto',md_autentificacion.Auth, productoController.agregarProducto)
app.put('/editarProducto/:id',md_autentificacion.Auth, productoController.editarProducto)
app.get('/obtenerProductos', md_autentificacion.Auth, productoController.buscarProductos)
app.put('/stock/:id', md_autentificacion.Auth, productoController.controlStock)
app.get('/obtenerPNombre/:nombreProducto', md_autentificacion.Auth, productoController.buscarPorNombre)
app.get('/vendidos', md_autentificacion.Auth, productoController.masVendidos)

module.exports = app;