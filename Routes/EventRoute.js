const { Router } = require('express');
const { check } = require('express-validator');
const { getAllEventos, getOneEvento, createEvento, updateEvento, deleteEvento } = require('../Controllers/EventController');
const { isDate } = require('../Helpers/isDate');
const { validarCampos } = require('../Middleware/Validators/validarCampos');
const { validarJWT } = require('../Middleware/Validators/validarJWT');
const router = Router();

router.use( validarJWT );

router.get('/', getAllEventos);
router.get('/id/:id', getOneEvento);
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La fecha de fin es obligatorio').custom( isDate ),
        validarCampos
    ],
    createEvento
);
router.put(
    '/id/:id',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'La fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'La fecha de fin es obligatorio').custom( isDate ),
        validarCampos
    ],
    updateEvento
);
router.delete('/id/:id', deleteEvento);

module.exports = router;