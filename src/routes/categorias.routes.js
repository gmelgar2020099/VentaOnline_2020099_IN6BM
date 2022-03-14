const express = require('express');
const categoriasControlllers = require('../controllers/categorias.controller');
const md_autentificacion = require('../middlewares/aut');

var app = express.Router();


app.post('/agregarCategoria',md_autentificacion.Auth, categoriasControlllers.agregarCategoria)
app.put('/editarCategoria/:id', md_autentificacion.Auth, categoriasControlllers.editarCategoria)
app.delete('/eliminarCategoria/:id', md_autentificacion.Auth, categoriasControlllers.eliminarCategoriaDefault)
app.get('/buscarCategorias', md_autentificacion.Auth, categoriasControlllers.buscarCategorias)
app.get('/buscarNombreCategoria/:nombreCategoria', md_autentificacion.Auth, categoriasControlllers.buscarPorNombreCategoria)



module.exports = app;