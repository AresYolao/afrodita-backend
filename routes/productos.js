// ruta : /api/productos


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto,
    busquedaProducto
} = require('../controllers/productos')

const router = Router();


router.get('/', getProductos);
router.post('/', [

    validarJWT,
    check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
    check('precio', 'El precio del producto es necesario').not().isEmpty(),
    validarCampos
], crearProducto);

router.put('/:id', [


], actualizarProducto);

router.delete('/:id', borrarProducto)

router.get('/:busqueda', busquedaProducto);



module.exports = router;