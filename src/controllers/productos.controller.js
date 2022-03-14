const Productos = require('../models/producto.model')
const brycpt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')


function agregarProducto(req, res) {
    var parameters = req.body
    var productoModel = new Productos()
    var verificacion = req.user.rol
    if (parameters.nombre, parameters.precio, parameters.stock && parameters.idCategoria) {
        productoModel.nombre = parameters.nombre
        productoModel.precio = parameters.precio
        productoModel.vendido = 0
        productoModel.stock = parameters.stock
        productoModel.idCategoria = parameters.idCategoria
    }
    if (verificacion == 'ROL_ADMINISTRADOR') {
        Productos.find({nombre: parameters.nombre}, (err, productoAgregado) => {
                if (productoAgregado.length == 0) {
                        productoModel.save((err, producto) => {
                            if (err) return res.status(500).send({ message: 'Error en la peticion' });
                            if (!producto) return res.status(404).send({ message: 'error, al agregar el empleado' });
                            return res.status(200).send({ Productos: producto });
                        })
                } else {
                    return res.status(404).send({ message: 'esta creando el mismo producto' })
                }
            })
    } else {
        return res.status(404).send({ message: 'No tiene los permisos para realizar esta accion' })
    }
}

function editarProducto(req, res) {
    var idProducto = req.params.id
    var parametros = req.body
    var verificacion = req.user.rol
    if (verificacion == 'ROL_ADMINISTRADOR') {
        Productos.findByIdAndUpdate({ _id: idProducto }, parametros, { new: true }, (err, productoEditar) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });
            if (!productoEditar) return res.status(404).send({ message: 'error, al editar el Producto' });
            return res.status(200).send({ Productos: productoEditar });
        })
    } else {
        return res.status(404).send({ message: 'No tiene los permisos para realizar esta accion' })
    }
}




function buscarProductos(req, res) {
    var verificacion = req.user.rol
    if (verificacion == "ROL_ADMINISTRADOR") {
        Productos.find((err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!productoEncontrado) return res.status(404).send({ mensaje: "Error, no se encuentran productos" });

            return res.status(200).send({ productos: productoEncontrado });
        })
    } else {
        return res.status(500).send({ mensaje: 'No posee permisos para completar la peticion' });
    }
}

function controlStock(req, res) {
    const idProducto = req.params.id;
    const parametros = req.body;
    if (req.user.rol == "ROL_ADMINISTRADOR") {
        if (parametros.stock >= 0) {
            Productos.findByIdAndUpdate(idProducto, { $inc: { stock: parametros.stock } }, { new: true },
                (err, productoModificado) => {
                    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
                    if (!productoModificado) return res.status(500).send({ mensaje: 'Error al editar el stock del Producto' });
                    return res.status(200).send({ productos: productoModificado })
                })
        } else {
            return res.status(500).send({ mensaje: 'No puede descontar mas de la existencia' });
        }
    } else {
        return res.status(500).send({ mensaje: 'No posee permisos para completar la peticion' });
    }
}
function buscarPorNombre(req, res){
    var nombreProducto = req.params.nombreProducto;
        Productos.find({nombre: {$regex:nombreProducto,$options:['i','x']}}, (err, productoEncontrado) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion"});
             if(!productoEncontrado) return res.status(404).send({mensaje : "Error, no se encuentran productos con ese nombre"});
             return res.status(200).send({productos : productoEncontrado});
         })
}

function masVendidos(req,res){
    Productos.find((err,productoVendido) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
        if (!productoVendido) return res.status(500).send({ mensaje: 'Error al encontrar producto vendido' });

        return res.status(200).send({"El orden de productos vendidos son": productoVendido})
    }).sort({
        vendido : -1
    })
}

module.exports = {
    agregarProducto,
    editarProducto,
    buscarProductos,
    controlStock,
    buscarPorNombre,
    masVendidos
}