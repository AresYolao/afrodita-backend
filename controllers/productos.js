const { response } = require('express');
const Producto = require('../models/producto')


const getProductos = async(req, res = response) => {


    const desde = Number(req.query.desde) || 0;

    const [productos, total] = await Promise.all([

        Producto.find().skip(desde).limit(5),

        Producto.count()

    ])


    res.json({
        ok: true,
        productos,
        total
    })
}


const busquedaProducto = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const desde = Number(req.query.desde) || 0;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, total] = await Promise.all([
        Producto.find({ $or: [{ 'nombre': regex }, { 'codigoBarras': regex }] }).skip(desde).limit(5),

        Producto.count()
    ])





    res.json({
        ok: true,
        usuarios,
        total
    })
}

const crearProducto = async(req, res = response) => {


    const producto = new Producto(req.body);

    try {

        const productoDB = await producto.save();
        res.json({
            ok: true,
            producto: productoDB
        })


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al crear un producto'

        })
    }



}

const actualizarProducto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarProductos'
    })
}

const borrarProducto = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarProductos'
    })
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    busquedaProducto
}