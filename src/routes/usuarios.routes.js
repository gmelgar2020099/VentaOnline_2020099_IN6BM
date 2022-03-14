const express = require('express');
const usuarioController = require('../controllers/usuarios.controller');
const md_autentificacion = require('../middlewares/aut');

var app = express.Router();


app.post('/login',usuarioController.login)
app.post('/agregarUsuarios', md_autentificacion.Auth,usuarioController.registrarUsuario)
app.delete('/eliminarUsuarios/:id', md_autentificacion.Auth,usuarioController.eliminarCliente)
app.put('/editarUsuarios/:id', md_autentificacion.Auth,usuarioController.editarUsuarios)
app.put('/agregarProductoCarrito', md_autentificacion.Auth, usuarioController.agregarProductoCarrito)
app.post('/agregarCliente', md_autentificacion.Auth, usuarioController.agregarClientes)
app.delete('/eliminarPC', md_autentificacion.Auth, usuarioController.eliminarArray)
app.put('/editarCliente/:id', md_autentificacion.Auth, usuarioController.editarCliente)
app.delete('/eliminarU/:id', md_autentificacion.Auth, usuarioController.eliminarU)

module.exports = app;