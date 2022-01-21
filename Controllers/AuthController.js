const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../Helpers/jwt');
const UsuarioModel = require('../Models/UsuarioModel');

const crearUsuario = async( req, res = response ) => {
    const { email, password } = req.body;
    try{
        let usuario = await UsuarioModel.findOne({ email });
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Email ya esta registrado'
            })
        }

        usuario = new UsuarioModel( req.body);

        const salt = bcryptjs.genSaltSync( 8 );
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    }
    catch ( e ){
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el soporte tecnico'
        });
    }
}

const loginUsuario = async( req, res = response ) => {
    const { email, password } = req.body;

    try{
        const usuario = await UsuarioModel.findOne({ email });
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario incorrecto'
            });
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrector'
            })
        }

        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    }
    catch ( e ){
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el soporte tecnico'
        });
    }
}

const revalidarToken = async ( req, res = response ) => {
    const { uid, name } = req;
    const token = await generarJWT( uid, name );
    res.status(201).json({
        ok: true,
        msg: 'new Token',
        token
    });
}

module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}