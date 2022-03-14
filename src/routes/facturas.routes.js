const express = require('express');
const facturaController = require('../controllers/factura.controller');
const md_autentificacion = require('../middlewares/aut');

var app = express.Router();

app.post('/generarFacturas', md_autentificacion.Auth,facturaController.obtenerFactura)
app.get('/buscarFacturas', md_autentificacion.Auth,facturaController.buscarFacturas)




module.exports = app;