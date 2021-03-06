const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No esta autenticado'
        });
    }

    try{
        const { uid, name } = jwt.verify(
            token,
            process.env.SUPER_SECRET
        );
        
        req.uid = uid;
        req.name = name;

        
    }
    catch( e ){
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}