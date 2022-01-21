const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../Controllers/AuthController');
const { validarCampos } = require('../Middleware/Validators/validarCampos');
const { validarJWT } = require('../Middleware/Validators/validarJWT');
const router = Router();

router.post(
    '/', 
    [  
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post(
    '/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get('/reToken', validarJWT,revalidarToken);

module.exports = router;