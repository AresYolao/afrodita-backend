const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

    nombre: { type: String, required: true },
    codigoBarras: { type: String, required: false, unique: true },
    precio: { type: Number, required: true }
}, { collection: 'productos' });

// UsuarioSchema.method('toJSON', function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.uid = _id
//     return object;
// })

module.exports = model('Producto', ProductoSchema);