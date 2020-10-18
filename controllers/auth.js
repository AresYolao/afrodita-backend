const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Error en credenciales'
            })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Error en credenciales'
            });
        }


        //TODO generar web token

        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en login'
        })

    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken)

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            //si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                google: true
            })
        } else {
            //existe usuario

            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@'
        }

        //Guardar en base de datos
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}