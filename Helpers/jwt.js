const jwt = require("jsonwebtoken");

const generarJWT = ( uid, name ) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign( payload, process.env.SUPER_SECRET, {
            expiresIn: '2h'
        }, ( e, token ) => {
            if( e ){
                console.log( e );
                reject('No se pudo generar el token');
            }

            resolve( token );
        });
    });
}

module.exports = {
    generarJWT
}