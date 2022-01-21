const { response } = require("express");
const EventoModel = require("../Models/EventoModel");

const getAllEventos = async ( req, res = response ) => {
    const eventos = await EventoModel.find().populate('user', 'name');
    res.status(201).json({
        ok: true,
        msg: eventos
    });
}

const getOneEvento = ( req, res = response ) => {
    res.status(201).json({
        ok: true,
        msg: 'getOneEvento',
        uid: req.params.id
    });
}

const createEvento = async ( req, res = response ) => {
    const evento = new EventoModel( req.body );
    try{
        evento.user = req.uid;
        await evento.save();

        res.status(201).json({
            ok: true,
            evento
        });

    }
    catch( e ){
        console.log( e );
        res.status(500).json({
            ok: false,
            msg: 'contactese con soporte tecnico'
        });
    }
}

const updateEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await EventoModel.findById( eventoId );
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe evento'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar'
            });
        }
        const newEvento = {
            ...req.body,
            user: uid
        }

        const result = await EventoModel.findByIdAndUpdate( eventoId, newEvento, { new: true } );

        res.status(201).json({
            ok: true,
            evento: result
        });
    }
    catch ( e ) {
        console.log( e );
        res.status(500).json({
            ok: false,
            msg: 'contactese con el soporte tecnico',
        });
    }
    
}

const deleteEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await EventoModel.findById( eventoId );
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'no existe evento'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para eliminar'
            });
        }

        await EventoModel.findByIdAndDelete( eventoId )

        res.status(201).json({ ok: true });
    }
    catch ( e ) {
        console.log( e );
        res.status(500).json({
            ok: false,
            msg: 'contactese con el soporte tecnico',
        });
    }
}

module.exports = {
    getAllEventos,
    getOneEvento,
    createEvento,
    updateEvento,
    deleteEvento
}