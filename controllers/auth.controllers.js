const {response} = require('express');
const Usuarios = require('../models/usuarios.js')
const bcryptjs = require('bcryptjs');
const login = async (req, res=response)=>{
    const {email, password} = req.body
    const newUser = new Usuarios(req.body)
    try {
        /// si email existe
        const existeEmail = await Usuarios.findOne({email});
        if(!existeEmail)
            return res.status(400).json({eerror:'Usuario no registrado'});
        /// verificar si esta activo
        if((existeEmail.estado) === false)
            return res.status(400).json({eerror:'El usuario esta inactivo'});
        /// password conincide con la llave
         const passwordValidation = bcryptjs.compareSync(password, existeEmail.password);
         if(!passwordValidation)
            return res.status(400).json({eerror:'El password no es correcto'});
        console.log(password);
        if(password === email.password)
            return res.status(400).json({siii:'funshionnnn'});
        //funshion
        /* const nuevoUser = await newUser.save() */
        /* res.json(nuevoUser) */
        res.json({msg: "Funciona mi loko :) -- funshion my craisyy"})

    } catch (error) {
        console.log("no funshion",error);
    }
}
module.exports = {login}

// debe tener un titutlo y un objetivo general, unos objetivos especificos (el que(PAGINAWEB), el como(como se va a hacer(node.js)), para que (para que se va a hacer), para quien (Usuario final))
//min 3 objetivos max 5
//descripcion del problema
// listar requerimientos
// justificacion del porque lo esta haciendo 
//resultados esperados
// 