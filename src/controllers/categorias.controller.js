const Categorias = require('../models/categorias.model')
const brycpt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const Productos = require('../models/producto.model')


function agregarCategoria(req, res) {
    var parameters = req.body
    var verificacion = req.user.rol
    const categoriaModel = new Categorias()
    if (parameters.nombre) {
        categoriaModel.nombre = parameters.nombre
    }
    if (verificacion == 'ROL_ADMINISTRADOR') {
        Categorias.find({ nombre: parameters.nombre }, (err, clienteGuardado) => {
            if (clienteGuardado.length == 0) {
                categoriaModel.save((err, productoGuardado) => {
                    if (err) return res.status(500).send({ message: "error en la peticion" });
                    if (!productoGuardado) return res.status(404).send({ message: "Error, no se agrego la encuesta" });
                    return res.status(200).send({ encuesta: productoGuardado })
                })
            } else {
                return res.status(500).send({ mensaje: 'No se pueden crear con el mismo nombre' });
            }
        })
    } else {
        return res.status(404).send({ message: 'no tiene permisos para realizar esta accion' })
    }
}

function editarCategoria(req, res) {
    var idCategoria = req.params.id
    var parameters = req.body
    var verificacion = req.user.rol
    if (verificacion = 'ROL_ADMINISTRADOR') {
        Categorias.findByIdAndUpdate({ _id: idCategoria }, parameters, { new: true }, (err, result) => {
            console.log(result);
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
 
            if (!result) return res.status(400).send({ mensaje: 'No se pudo editarr la categoria' });
            return res.status(200).send({ categorias: result });
        })
    }
}

function eliminarCategoriaDefault(req, res) {
    var idCategoriaEliminada = req.params.id;
        Categorias.findOne({ nombreCategoria: 'default' }, (err, categoriaEncontrada) => {
            Productos.updateMany({ idCategoria: idCategoriaEliminada }, { idCategoria: categoriaEncontrada._id }, (err, categoriaEliminar) => {
                Categorias.findByIdAndDelete(idCategoriaEliminada, (err, categoriaEliminada) => {
                    if (idCategoriaEliminada == null)
                        return res
                            .status(500)
                            .send({ mensaje: "Debe enviar el id de la categoria" });

                    if (err)
                        return res.status(500).send({ mensaje: "Error en la peticion" });

                    if (!idCategoriaEliminada)
                        return res
                            .status(500)
                            .send({ mensaje: "Error al editar la categoria" });

                    return res.status(200).send({ categoria: categoriaEliminada });
                })
            })
        })
    }
function buscarCategorias(req, res) {
    if (req.user.rol == "ROL_ADMINISTRADOR") {
        Categorias.find((err, categoriaEncontrado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!categoriaEncontrado) return res.status(404).send({ mensaje: "Error, no se encuentran categorias" });
            return res.status(200).send({ categorias: categoriaEncontrado });
        })
    } else {
        return res.status(500).send({ mensaje: 'No posee permisos para completar la peticion' });
    }
}
function buscarPorNombreCategoria(req, res){
    var nombreCategoria = req.params.nombreCategoria;
    if(req.user.rol == "ROL_CLIENTE"){
        Categorias.findOne({nombre: {$regex:nombreCategoria,$options:['i','x']}}, (err, categoriaEncontrado) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion nom"});
            if(!categoriaEncontrado) return res.status(404).send({mensaje : "Error, no se encuentran categorias con ese nombre"});
           Productos.find({idCategoria:categoriaEncontrado._id},(err,productoEncontrados) =>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion producto"});
            if(!productoEncontrados) return res.status(404).send({mensaje : "Error, no se encuentran productos"});
            return res.status(200).send({producto : productoEncontrados});
        }).populate('idCategoria','nombre')
            
         })
    } else {
        return res.status(500).send({mensaje: 'No posee permisos para completar la peticion'});
    }
}

module.exports = {
    agregarCategoria,
    editarCategoria,
    eliminarCategoriaDefault,
    buscarCategorias,
    buscarPorNombreCategoria
}