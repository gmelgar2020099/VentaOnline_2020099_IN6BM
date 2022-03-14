const Productos = require('../models/producto.model')
const Usuarios = require('../models/usuarios.model')
const Facturas = require('../models/factura.model')

function obtenerFactura(req, res) {
    var usuarioLog = req.user.sub
    var parametros = req.body
    const facturaModel = new Facturas();
    Usuarios.findById(usuarioLog, (err, respuesta) => {
        facturaModel.lista = respuesta.carrito
        facturaModel.idUsuario = usuarioLog
        facturaModel.totalFactura = respuesta.totalCarrito
        facturaModel.nit = parametros.nit
        for (let i = 0; i < respuesta.carrito.length; i++) {
           Productos.findOneAndUpdate({nombreProducto:respuesta.carrito[i].nombreProducto},{$inc:{vendido:respuesta.carrito[i].cantidad}}, (err, vendido) => {
        })
        }
        facturaModel.save((err, facturaGuardada) => {
            Usuarios.findByIdAndUpdate(usuarioLog, { $set: { carrito: [] }, totalCarrito: 0 }, { new: true }, (err, carritoVacio) => {
                Facturas.findById(facturaGuardada._id, (err, facturaGenerada) => {
                    return res.status(200).send({ factura: facturaGenerada });
                });
            })
        })
    })
}

function buscarFacturas(req, res){
    var verificacion = req.user.rol
    if(verificacion == "ROL_ADMINISTRADOR"){
    Facturas.find((err,facturaEncontrada) =>{
        if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
         if(!facturaEncontrada) return res.status(404).send({mensaje : "Error en la busqueda de facturas"});
         return res.status(200).send({facturas : facturaEncontrada});
     })
    } else {
        return res.status(500).send({mensaje: 'No tiene permisos para realizar dicha accion'});
    }
};
module.exports = {
    buscarFacturas,
    obtenerFactura
}